// cutting-optimizer.js

/**
 * @typedef {Object} TCutPiece
 * @property {number} Length
 * @property {number} Quantity
 * @property {string} Name
 * @property {number} RemainingQty
 * @property {string} SKU
 */

/**
 * @typedef {Object} TStockPiece
 * @property {number} Length
 * @property {string} Name
 * @property {Array<[string, number]>} cuts
 * @property {number} CutCount
 * @property {number} WasteLength
 */

/**
 * @typedef {Object} TCuttingPattern
 * @property {TStockPiece[]} StockUsed
 * @property {number} TotalWaste
 * @property {number} Efficiency
 * @property {number} TotalCuts
 * @property {string} SKU
 * @property {string} Description
 * @property {number} UnitCost
 * @property {number} TotalCost
 */

/**
 * @typedef {Object} TWindowForCosting
 * @property {string} Type
 * @property {string} Glazing
 * @property {string} Configuration
 * @property {number} Qty
 * @property {number} HeightMM
 * @property {number} WidthMM
 */

/**
 * stockType shape expected:
 * {
 *   SKU: string,
 *   Length: number,
 *   Description: string,
 *   Cost: number
 * }
 */

export class CuttingOptimizer {
  /**
   * Main entry point
   * @param {Object} options
   * @param {TWindowForCosting[]} options.windows
   * @param {Array<Object>} options.stockUsageRows
   * @param {Array<Object>} options.stockTypes
   * @param {number} options.bladeThickness
   * @param {boolean} [options.updateQuoteMetalCost=false]
   * @returns {Array<Object>}
   */
  run({
    windows,
    stockUsageRows,
    stockTypes,
    bladeThickness,
  }) {
    const results = [];

    for (let i = 0; i < windows.length; i++) {
      const window = windows[i];

      if ((window.Qty ?? 0) <= 0) continue;

      let metalCost = 0;
      const allCuts = this.readCuts(window, stockUsageRows);

      for (const cut of allCuts) {
        const currentStockType = stockTypes.find(s => s.SKU === cut.SKU);
        if (!currentStockType) {
          throw new Error(`Stock type not found for SKU: ${cut.SKU}`);
        }

        const cutsBySKU = this.getCutsBySKU(allCuts, cut.SKU);
        const result = this.optimizePattern(
          cutsBySKU,
          currentStockType,
          cut,
          bladeThickness
        );

        metalCost += result.TotalCost;
        results.push({
          windowIndex: i,
          window,
          sku: cut,
          pattern: result
        });
      }

        window.MetalCost = metalCost;
    }

    return results;
  }

  /**
   * VBA ReadWindowsForPricing equivalent
   * @param {Array<Object>} tableRows
   * @returns {TWindowForCosting[]}
   */
  readWindowsForPricing(tableRows) {
    return tableRows.map(row => ({
      Type: String(row.Type ?? ""),
      Glazing: String(row.Glazing ?? ""),
      Configuration: String(row.Configuration ?? "").substring(0, 2),
      Qty: Number(row.Qty ?? 0),
      HeightMM: Number(row.Height ?? 0),
      WidthMM: Number(row.Width ?? 0)
    }));
  }

  /**
   * VBA ReadCuts2 equivalent
   * @param {TWindowForCosting} windowInput
   * @param {Array<Object>} stockUsageRows
   * @returns {TCutPiece[]}
   */
  readCuts(windowInput, stockUsageRows) {
    const matchingRows = stockUsageRows.filter(row =>
      String(row.Glazing ?? "") === windowInput.Glazing &&
      String(row.Type ?? "") === windowInput.Type &&
      String(row.Configuration ?? "") === windowInput.Configuration
    );

    return matchingRows.map(row => {
      const isWidth = String(row.Location ?? "") === "W";
      const cutLength = isWidth ? windowInput.WidthMM : windowInput.HeightMM;
      const cutQty = Number(row.Qty ?? 0) * Number(windowInput.Qty ?? 0);

      return {
        Length: cutLength,
        Quantity: cutQty,
        Name: String(row.Position ?? ""),
        SKU: String(row.SKU ?? ""),
        RemainingQty: cutQty
      };
    });
  }

  /**
   * VBA OptimizePattern equivalent
   * First Fit Decreasing
   * @param {TCutPiece[]} cuts
   * @param {Object} stockType
   * @param {string} sku
   * @param {number} bladeThickness
   * @returns {TCuttingPattern}
   */
  optimizePattern(cuts, stockType, sku, bladeThickness) {
    const result = {
      StockUsed: [],
      TotalWaste: 0,
      Efficiency: 0,
      TotalCuts: 0,
      SKU: sku,
      Description: stockType.Description,
      UnitCost: stockType.Cost,
      TotalCost: 0
    };

    const sortedCuts = this.sortCutsByLength([...cuts]);
    const stockPieces = [];

    for (const cut of sortedCuts) {
      for (let j = 0; j < cut.Quantity; j++) {
        let fitted = false;

        for (const stockPiece of stockPieces) {
          let remainingLength = stockType.Length;

          for (const existingCut of stockPiece.cuts) {
            remainingLength -= existingCut[1] + bladeThickness;
          }

          if (cut.Length <= remainingLength) {
            stockPiece.cuts.push([cut.Name, cut.Length]);
            stockPiece.CutCount++;
            fitted = true;
            break;
          }
        }

        if (!fitted) {
          stockPieces.push({
            Length: stockType.Length,
            Name: stockType.Description,
            cuts: [[cut.Name, cut.Length]],
            CutCount: 1,
            WasteLength: 0
          });
        }
      }
    }

    let totalUsed = 0;
    const totalStock = stockPieces.length * stockType.Length;

    for (const stockPiece of stockPieces) {
      let remainingLength = stockType.Length;

      for (const cut of stockPiece.cuts) {
        remainingLength -= cut[1] + bladeThickness;
        totalUsed += cut[1];
        result.TotalCuts++;
      }

      stockPiece.WasteLength = remainingLength;
      result.TotalWaste += remainingLength;
      result.StockUsed.push(stockPiece);
    }

    result.Efficiency = totalStock > 0 ? (totalUsed / totalStock) * 100 : 0;
    result.TotalCost = result.UnitCost * stockPieces.length;

    return result;
  }

  /**
   * @param {TCutPiece[]} cuts
   * @param {string} sku
   * @returns {TCutPiece[]}
   */
  getCutsBySKU(cuts, sku) {
    return cuts
      .filter(cut => cut.SKU === sku)
      .map(cut => ({
        Length: cut.Length,
        Quantity: cut.Quantity,
        Name: cut.Name,
        RemainingQty: cut.RemainingQty,
        SKU: cut.SKU
      }));
  }

  /**
   * @param {TCutPiece[]} cuts
   * @returns {number}
   */
  getTotalCutPieces(cuts) {
    return cuts.reduce((total, cut) => total + Number(cut.Quantity || 0), 0);
  }

  /**
   * @param {TCutPiece[]} cuts
   * @returns {TCutPiece[]}
   */
  sortCutsByLength(cuts) {
    return cuts.sort((a, b) => b.Length - a.Length);
  }
}
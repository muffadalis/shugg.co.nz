import { CuttingOptimizer } from "./co.js";

const optimizer = new CuttingOptimizer();
console.log("optimizer:", optimizer);

(function (window) {
    "use strict";

    const config = window.PricingData;

    function round2(v) {
        return Math.round((v + Number.EPSILON) * 100) / 100;
    }

    function money(v) {
        return `$${round2(v).toFixed(2)}`;
    }

    function buildKey(type, glazing, configuration) {
        return `${type}|${glazing}|${configuration}`;
    }

    function findWindowCostRule(type, glazing, configuration) {
        const key = buildKey(type, glazing, configuration);
        return config.windowCosts.find(x => x.key.trim() === key);
    }

    function findGlassRule(type, glazing, thickness) {
        // console.log("Finding glass rule for", { type, glazing, thickness });
        return config.glass.find(x =>
            x.type === type &&
            x.glazing === glazing &&
            Number(x.thickness) === Number(thickness)
        );
    }

    function calcMetal(input) {
        // Example input (this will come from your UI)
        const inputWindows = [
            {
                Type: input.type,
                Glazing: input.glazing,
                Configuration: input.configuration,
                Qty: input.quantity,
                HeightMM: input.heightM * 1000,
                WidthMM: input.widthM * 1000
            }
        ];

        // IMPORTANT: normalize configuration (same as VBA logic)
        inputWindows.forEach(w => {
            w.Configuration = w.Configuration.substring(0, 2);
        });

        const results = optimizer.run({
            windows: inputWindows,
            stockUsageRows: PricingData.stockUsageRows,
            stockTypes: PricingData.stockTypes,
            bladeThickness: 2.5
        });

        console.log(results);
        console.log(inputWindows);

        return {
            ok: true,
            cost: results.reduce((sum, r) => sum + r.pattern.TotalCost, 0),
            meta: {
            }
        };
    }

    function calcGlass(input) {
        const rule = findGlassRule(input.type, input.glazing, input.thickness);
        if (!rule) return { ok: false, error: "Glass rule not found" };

        const area = input.widthM * input.heightM;

        return {
            ok: true,
            cost: round2(area * rule.costPerM2),
            meta: {
                areaM2: round2(area),
                costPerM2: rule.costPerM2
            }
        };
    }

    function calcPolishing(input) {
        const perimeter = input.widthM * input.heightM * 2 * 2; // h * w * panes * 2
        var cost = config.polishing.find(x => Number(x.thickness) === Number(input.thickness))?.costPerM;
        return {
            ok: true,
            cost: round2(perimeter * cost),
            meta: {
                perimeterM: round2(perimeter),
                cost: cost
            }
        };
    }

    function calcLead(input) {
        // console.log("Calculating lead for input:", input);
        const kg = input.widthM * (input.heightM / 2) * (input.thickness / 1000) * 2500;

        return {
            ok: true,
            kg: round2(kg),
            cost: round2(kg * config.leadPerKg),
            meta: {
                leadKg: round2(kg)
            }
        };
    }

    function calcComponents(input) {
        const rule = findWindowCostRule(input.type, input.glazing, input.configuration);
        if (!rule) return { ok: false, error: "Component rule not found" };

        return {
            ok: true,
            cost: round2(rule.componentCost),
            meta: {
                componentCost: round2(rule.componentCost)
            }
        };
    }

    function calcInstallLabour(input) {
        const rule = findWindowCostRule(input.type, input.glazing, input.configuration);
        if (!rule) return { ok: false, error: "Install rule not found" };

        const hourlyRate = config.labourRates.installPerHour;
        const cost = rule.installHours * hourlyRate;

        return {
            ok: true,
            cost: round2(cost),
            meta: {
                installHours: round2(rule.installHours),
                installRate: round2(hourlyRate)
            }
        };
    }

    function calcManufacture(input) {
        const rule = findWindowCostRule(input.type, input.glazing, input.configuration);
        if (!rule) return { ok: false, error: "Manufacture rule not found" };

        const hourlyRate = config.labourRates.manufacturePerHour;
        const cost = rule.manufactureHours * hourlyRate;

        return {
            ok: true,
            cost: round2(cost),
            meta: {
                manufactureHours: round2(rule.manufactureHours),
                manufactureRate: round2(hourlyRate)
            }
        };
    }

    function calcTravel(input) {
        //console.log("Calculating travel for input:", input);
        return {
            ok: true,
            cost: round2((input.quantity * config.travelBase) + config.labourRates.travelPerHour),
            meta: {
            }
        };
    }

    function calculateQuote(input) {
        const modules = {
            glass: calcGlass(input),
            polishing: calcPolishing(input),
            lead: calcLead(input),
            component: calcComponents(input),
            installLabour: calcInstallLabour(input),
            manufacture: calcManufacture(input),
            travel: calcTravel(input),
            metal: calcMetal(input)
        };

        for (const key of Object.keys(modules)) {
            if (!modules[key].ok) {
                return { ok: false, error: modules[key].error };
            }
        }

        const perUnitBreakdown = {
            glass: modules.glass.cost,
            polishing: modules.polishing.cost,
            lead: modules.lead.cost,
            component: modules.component.cost,
            installLabour: modules.installLabour.cost,
            manufacture: modules.manufacture.cost,
            metal: modules.metal.cost
        };

        const quantity = Number(input.quantity || 1);

        const perJobBreakdown = {
            travel: modules.travel.cost
        };

        const perUnitSubtotal = round2(
            Object.values(perUnitBreakdown).reduce((sum, value) => sum + value, 0)
        );

        const perJobSubtotal = round2(
            Object.values(perJobBreakdown).reduce((sum, value) => sum + value, 0)
        );

        const costSubtotal = round2((perUnitSubtotal * quantity) + perJobSubtotal);

        const tierKey = (input.marginTier || "standard").toLowerCase();
        const marginRate = config.marginTiers[tierKey];

        if (marginRate === undefined) {
            return { ok: false, error: `Unknown margin tier: ${input.marginTier}` };
        }

        const marginAmount = round2(costSubtotal * marginRate);
        const exGstTotal = round2(costSubtotal + marginAmount);
        const gstAmount = round2(exGstTotal * config.gstRate);
        const incGstTotal = round2(exGstTotal + gstAmount);

        return {
            ok: true,
            input: {
                type: input.type,
                glazing: input.glazing,
                configuration: input.configuration,
                thickness: Number(input.thickness),
                widthM: Number(input.widthM),
                heightM: Number(input.heightM),
                quantity,
                marginTier: tierKey
            },
            breakdown: {
                perUnit: {
                    glass: round2(perUnitBreakdown.glass),
                    polishing: round2(perUnitBreakdown.polishing),
                    lead: round2(perUnitBreakdown.lead),
                    component: round2(perUnitBreakdown.component),
                    installLabour: round2(perUnitBreakdown.installLabour),
                    manufacture: round2(perUnitBreakdown.manufacture),
                    metal: round2(perUnitBreakdown.metal)
                },
                extended: {
                    glass: round2(perUnitBreakdown.glass * quantity),
                    polishing: round2(perUnitBreakdown.polishing * quantity),
                    lead: round2(perUnitBreakdown.lead * quantity),
                    component: round2(perUnitBreakdown.component * quantity),
                    installLabour: round2(perUnitBreakdown.installLabour * quantity),
                    manufacture: round2(perUnitBreakdown.manufacture * quantity),
                    travel: round2(perJobBreakdown.travel),
                    metal: round2(perUnitBreakdown.metal * quantity)
                }
            },
            meta: {
                areaM2: modules.glass.meta.areaM2,
                perimeterM: modules.polishing.meta.perimeterM,
                leadKg: modules.lead.meta.leadKg,
                installHours: modules.installLabour.meta.installHours,
                installRate: modules.installLabour.meta.installRate,
                manufactureHours: modules.manufacture.meta.manufactureHours,
                manufactureRate: modules.manufacture.meta.manufactureRate,
                distanceKm: modules.travel.meta.distanceKm
            },
            totals: {
                perUnitSubtotal,
                perJobSubtotal,
                costSubtotal,
                marginRate,
                marginAmount,
                exGstTotal,
                gstRate: config.gstRate,
                gstAmount,
                incGstTotal
            }
        };
    }

    function buildQuoteOutput(result) {
        if (!result.ok) {
            return {
                text: result.error,
                html: `<div class="quote-error">${result.error}</div>`
            };
        }

        const b = result.breakdown;
        const t = result.totals;
        const i = result.input;
        const m = result.meta;

        const text = [
            `Quote Summary`,
            `Type: ${i.type}`,
            `Glazing: ${i.glazing}`,
            `Configuration: ${i.configuration}`,
            `Thickness: ${i.thickness} mm`,
            `Size: ${i.widthM} x ${i.heightM} mm`,
            `Qty: ${i.quantity}`,
            `Area: ${m.areaM2} m²`,
            ``,
            `Per unit:`,
            `Glass: ${money(b.perUnit.glass)}`,
            `Polishing: ${money(b.perUnit.polishing)}`,
            `Lead: ${money(b.perUnit.lead)}`,
            `Component: ${money(b.perUnit.component)}`,
            `Install Labour: ${money(b.perUnit.installLabour)}`,
            `Manufacture: ${money(b.perUnit.manufacture)}`,
            ``,
            `Extended:`,
            `Glass: ${money(b.extended.glass)}`,
            `Polishing: ${money(b.extended.polishing)}`,
            `Lead: ${money(b.extended.lead)}`,
            `Component: ${money(b.extended.component)}`,
            `Install Labour: ${money(b.extended.installLabour)}`,
            `Manufacture: ${money(b.extended.manufacture)}`,
            `Travel: ${money(b.extended.travel)}`,
            `Metal: ${money(b.extended.metal)}`,
            ``,
            `Cost Subtotal: ${money(t.costSubtotal)}`,
            `Margin (${Math.round(t.marginRate * 100)}%): ${money(t.marginAmount)}`,
            `Total ex GST: ${money(t.exGstTotal)}`,
            `GST (${Math.round(t.gstRate * 100)}%): ${money(t.gstAmount)}`,
            `Total inc GST: ${money(t.incGstTotal)}`
        ].join("\n");

        const html = `
      <div class="quote-output">
        <h4>Quote Summary</h4>
        <div><strong>Type:</strong> ${i.type}</div>
        <div><strong>Glazing:</strong> ${i.glazing}</div>
        <div><strong>Configuration:</strong> ${i.configuration}</div>
        <div><strong>Thickness:</strong> ${i.thickness} mm</div>
        <div><strong>Size:</strong> ${i.widthM} x ${i.heightM} mm</div>
        <div><strong>Qty:</strong> ${i.quantity}</div>
        <div><strong>Area:</strong> ${m.areaM2} m²</div>

        <hr>

        <div class="quote-row"><span>Glass</span><span>${money(b.extended.glass)}</span></div>
        <div class="quote-row"><span>Polishing</span><span>${money(b.extended.polishing)}</span></div>
        <div class="quote-row"><span>Lead</span><span>${money(b.extended.lead)}</span></div>
        <div class="quote-row"><span>Component</span><span>${money(b.extended.component)}</span></div>
        <div class="quote-row"><span>Install Labour</span><span>${money(b.extended.installLabour)}</span></div>
        <div class="quote-row"><span>Manufacture</span><span>${money(b.extended.manufacture)}</span></div>
        <div class="quote-row"><span>Travel</span><span>${money(b.extended.travel)}</span></div>
        <div class="quote-row"><span>Metal</span><span>${money(b.extended.metal)}</span></div>

        <hr>

        <div class="quote-row"><strong>Cost Subtotal</strong><strong>${money(t.costSubtotal)}</strong></div>
        <div class="quote-row"><span>Margin (${Math.round(t.marginRate * 100)}%)</span><span>${money(t.marginAmount)}</span></div>
        <div class="quote-row"><strong>Total ex GST</strong><strong>${money(t.exGstTotal)}</strong></div>
        <div class="quote-row"><span>GST (${Math.round(t.gstRate * 100)}%)</span><span>${money(t.gstAmount)}</span></div>
        <div class="quote-row quote-grand-total"><strong>Total inc GST</strong><strong>${money(t.incGstTotal)}</strong></div>
      </div>
    `;

        return { text, html };
    }

    window.PricingEngine = {
        round2,
        money,
        buildKey,
        findWindowCostRule,
        calculateQuote,
        buildQuoteOutput
    };
})(window);
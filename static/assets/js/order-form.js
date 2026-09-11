/*
 * Component order form (see layouts/components/single.html).
 * Plain IIFE, no dependencies. Renders live totals, toggles the Freight
 * address field, validates, and submits the order as JSON to Web3Forms.
 * Prices are ex-GST and ex-freight by definition — no tax maths here.
 */
(function () {
  "use strict";

  function init() {
    var form = document.getElementById("order-form");
    if (!form) return;

    var endpoint = form.dataset.endpoint || "https://api.web3forms.com/submit";
    var notifyEmail = form.dataset.notifyEmail || "info@shugg.co.nz";

    var rowsList = Array.prototype.slice.call(
      form.querySelectorAll(".order-form-row")
    );
    var subtotalCell = form.querySelector(".order-form-subtotal");
    var summaryField = form.querySelector("#order-summary-field");
    var subjectField = form.querySelector('input[name="subject"]');
    var statusEl = form.querySelector(".order-form-status");
    var submitBtn = form.querySelector(".order-form-submit");
    var deliveryRadios = form.querySelectorAll('input[name="delivery_method"]');
    var addressWrap = form.querySelector(".order-form-address");
    var addressField = form.querySelector('textarea[name="delivery_address"]');
    var searchInput = form.querySelector("#order-search");
    var searchEmpty = form.querySelector(".order-form-search-empty");

    function money(v) {
      return "$" + Number(v || 0).toFixed(2);
    }

    function isLengthRow(row) {
      return row.dataset.unit !== "each";
    }

    function unitLabel(row) {
      return isLengthRow(row) ? "m" : "each";
    }

    /* ---- quantities + totals ---- */

    function readQty(row) {
      var input = row.querySelector(".order-form-qty");
      var raw = parseFloat(input.value);
      if (isNaN(raw) || raw < 0) raw = 0;
      var qty = isLengthRow(row)
        ? Math.round(raw * 100) / 100
        : Math.floor(raw);
      if (String(qty) !== input.value && input.value !== "") {
        input.value = qty ? qty : "0";
      }
      return qty;
    }

    function recalc() {
      var subtotal = 0;
      rowsList.forEach(function (row) {
        var qty = readQty(row);
        var price = parseFloat(row.dataset.price) || 0;
        var line = qty * price;
        subtotal += line;
        var lineCell = row.querySelector(".order-form-line");
        if (lineCell) lineCell.textContent = money(line);
        row.classList.toggle("is-selected", qty > 0);
      });
      if (subtotalCell) subtotalCell.textContent = money(subtotal);
      return subtotal;
    }

    /* ---- search / filter ---- */

    function applySearch() {
      if (!searchInput) return;
      var q = searchInput.value.trim().toLowerCase();
      var visible = 0;
      rowsList.forEach(function (row) {
        var haystack = (
          row.querySelector(".order-form-item") || row
        ).textContent.toLowerCase();
        var match = !q || haystack.indexOf(q) !== -1;
        row.hidden = !match;
        if (match) visible += 1;
      });
      if (searchEmpty) searchEmpty.hidden = visible !== 0;
    }

    /* ---- delivery method ---- */

    function selectedDelivery() {
      var checked = form.querySelector(
        'input[name="delivery_method"]:checked'
      );
      return checked ? checked.value : "Pickup";
    }

    function syncDelivery() {
      var freight = selectedDelivery() === "Freight";
      if (addressWrap) addressWrap.hidden = !freight;
      if (addressField) {
        if (freight) {
          addressField.setAttribute("required", "required");
        } else {
          addressField.removeAttribute("required");
          addressField.value = "";
          clearError(addressField);
        }
      }
    }

    /* ---- validation ---- */

    function fieldError(el, message) {
      clearError(el);
      if (!message) return;
      el.setAttribute("aria-invalid", "true");
      var note = document.createElement("p");
      note.className = "order-form-error";
      note.textContent = message;
      note.dataset.errorFor = el.id || el.name;
      (el.closest(".order-form-address") || el).parentNode.insertBefore(
        note,
        (el.closest(".order-form-address") || el).nextSibling
      );
    }

    function clearError(el) {
      el.removeAttribute("aria-invalid");
      var key = el.id || el.name;
      var existing = form.querySelector(
        '.order-form-error[data-error-for="' + key + '"]'
      );
      if (existing) existing.remove();
    }

    function clearTableError() {
      var e = form.querySelector('.order-form-error[data-error-for="items"]');
      if (e) e.remove();
    }

    function tableError(message) {
      clearTableError();
      var note = document.createElement("p");
      note.className = "order-form-error";
      note.dataset.errorFor = "items";
      note.textContent = message;
      var fs = form.querySelector(".order-form-items");
      fs.appendChild(note);
    }

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate() {
      var ok = true;
      var firstInvalid = null;

      var subtotal = recalc();
      if (subtotal <= 0) {
        tableError("Add a quantity to at least one component.");
        firstInvalid = form.querySelector(".order-form-qty");
        ok = false;
      } else {
        clearTableError();
      }

      rowsList.forEach(function (row) {
        var colour = row.querySelector(".order-form-colour-select");
        if (!colour) return;
        if (readQty(row) > 0 && !colour.value) {
          fieldError(colour, "Choose a colour for " + row.dataset.title + ".");
          if (!firstInvalid) firstInvalid = colour;
          ok = false;
        } else {
          clearError(colour);
        }
      });

      [
        ["name", "Please enter your name."],
        ["email", "Please enter your email address."],
        ["phone", "Please enter your phone number."]
      ].forEach(function (pair) {
        var el = form.querySelector('[name="' + pair[0] + '"]');
        var val = (el.value || "").trim();
        if (!val) {
          fieldError(el, pair[1]);
          if (!firstInvalid) firstInvalid = el;
          ok = false;
        } else if (pair[0] === "email" && !EMAIL_RE.test(val)) {
          fieldError(el, "Please enter a valid email address.");
          if (!firstInvalid) firstInvalid = el;
          ok = false;
        } else {
          clearError(el);
        }
      });

      if (selectedDelivery() === "Freight" && addressField) {
        if (!(addressField.value || "").trim()) {
          fieldError(addressField, "Please enter a delivery address for freight.");
          if (!firstInvalid) firstInvalid = addressField;
          ok = false;
        } else {
          clearError(addressField);
        }
      }

      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return ok;
    }

    /* ---- order summary (human-readable, emailed) ---- */

    function buildSummary() {
      var lines = [];
      lines.push("COMPONENT ORDER — shugg.co.nz");
      lines.push("Prices exclude freight and GST.");
      lines.push("");
      lines.push("Line items:");

      var subtotal = 0;
      rowsList.forEach(function (row) {
        var qty = readQty(row);
        if (qty <= 0) return;
        var price = parseFloat(row.dataset.price) || 0;
        var line = qty * price;
        subtotal += line;
        var u = unitLabel(row);
        var label = u === "m" ? qty + "m " : qty + " x ";
        var lineText =
          "  " +
          label +
          row.dataset.title +
          " (" +
          row.dataset.sku +
          ") @ " +
          money(price) +
          "/" +
          u +
          " = " +
          money(line);
        var colourSel = row.querySelector(".order-form-colour-select");
        if (colourSel) {
          lineText += " — Colour: " + (colourSel.value || "(not selected)");
        }
        lines.push(lineText);
      });
      lines.push("Subtotal (excl. freight & GST): " + money(subtotal));
      lines.push("");

      var delivery = selectedDelivery();
      lines.push("Delivery method: " + delivery);
      if (delivery === "Freight" && addressField) {
        lines.push("Delivery address: " + (addressField.value || "").trim());
      }
      lines.push("");

      var get = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? (el.value || "").trim() : "";
      };
      lines.push("Customer:");
      lines.push("  Name:    " + get("name"));
      lines.push("  Company: " + (get("company") || "-"));
      lines.push("  Email:   " + get("email"));
      lines.push("  Phone:   " + get("phone"));
      lines.push("");

      var comment = get("order_comment");
      lines.push("Comments:");
      lines.push("  " + (comment || "-"));
      lines.push("");
      lines.push("NOTE: Freight and GST are NOT included in the subtotal above.");

      var text = lines.join("\n");
      if (summaryField) summaryField.value = text;

      var who = get("company") || get("name") || "website";
      if (subjectField) subjectField.value = "New component order — " + who;
      return text;
    }

    /* ---- status helpers ---- */

    function showStatus(kind, html) {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.className = "order-form-status is-" + kind;
      statusEl.innerHTML = html;
    }

    function mailtoLink(summary) {
      var subject = subjectField ? subjectField.value : "Component order";
      return (
        "mailto:" +
        notifyEmail +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(summary)
      );
    }

    /* ---- submit ---- */

    function collectPayload(summary) {
      var get = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? el.value : "";
      };
      var email = (get("email") || "").trim();
      return {
        access_key: get("access_key"),
        subject: get("subject"),
        from_name: get("from_name"),
        name: get("name"),
        company: get("company"),
        email: email,
        phone: get("phone"),
        delivery_method: selectedDelivery(),
        delivery_address:
          selectedDelivery() === "Freight" ? get("delivery_address") : "",
        order_comment: get("order_comment"),
        order_summary: summary,
        replyto: email
      };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var botcheck = form.querySelector('input[name="botcheck"]');
      if (botcheck && botcheck.checked) return;

      if (!validate()) return;

      var summary = buildSummary();
      var payload = collectPayload(summary);

      if (submitBtn) submitBtn.disabled = true;
      showStatus("pending", "Sending your order…");
      if (statusEl) statusEl.className = "order-form-status";

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.success) {
            showStatus(
              "success",
              "Thanks — your order has been emailed to Shugg and a copy sent to you. " +
                "Prices exclude freight &amp; GST; Shugg will confirm final pricing and send an invoice."
            );
            form.reset();
            syncDelivery();
            recalc();
          } else {
            var msg =
              (result.data && result.data.message) ||
              "Something went wrong sending your order.";
            showStatus(
              "error",
              msg +
                ' You can <a href="' +
                mailtoLink(summary) +
                '">email your order to Shugg instead</a>.'
            );
          }
        })
        .catch(function () {
          showStatus(
            "error",
            'We could not reach the order service. You can ' +
              '<a href="' +
              mailtoLink(summary) +
              '">email your order to Shugg instead</a>.'
          );
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });

    /* ---- wire up ---- */

    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("order-form-qty")) recalc();
      if (e.target.hasAttribute("aria-invalid")) clearError(e.target);
    });
    form.addEventListener("change", function (e) {
      if (e.target.classList.contains("order-form-qty")) recalc();
      if (e.target.classList.contains("order-form-colour-select")) {
        clearError(e.target);
      }
    });
    Array.prototype.forEach.call(deliveryRadios, function (r) {
      r.addEventListener("change", syncDelivery);
    });
    if (searchInput) {
      searchInput.addEventListener("input", applySearch);
      searchInput.addEventListener("search", applySearch);
    }

    syncDelivery();
    recalc();
    applySearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

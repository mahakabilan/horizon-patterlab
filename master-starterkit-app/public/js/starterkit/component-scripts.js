/*** Component Scripts 
  This file contains all the javascript implementation of a component if necessary.  It can utilize configuration from window.CP and/or the html's data attributes.
***/

/*** Dosage Chart ***/
(function ($) {
  function dosageChart(element, options) {
    var $this = this;
    $this.$element = $(element)
      .on('change', "input.lb", this.onLbChange.bind(this))
      .on('change', "input.kg", this.onKgChange.bind(this))
      .on('keydown', "input.lb", this.onLbKeyPress.bind(this))
      .on('keydown', "input.kg", this.onKgKeyPress.bind(this));
    var data = $this.$element.data() || {};
    $this.defaultValue = typeof data.defaultValue !== 'undefined' ? data.defaultValue : options.defaultValue;
    $this.minWeight = typeof data.minWeight !== 'undefined' ? data.minWeight : options.minWeight;
    $this.maxWeight = typeof data.maxWeight !== 'undefined' ? data.maxWeight : options.maxWeight;
    $this.invalidTimer = (typeof data.invalidTimer !== 'undefined' ? data.invalidTimer : options.invalidTimer) * 1000 /* seconds to ms */;
    $this.$lb = $this.$element.find("input.lb");
    $this.$kg = $this.$element.find("input.kg");
    $this.$error = $this.$element.find(".error-text").length ? $this.$element : $this.$element;
    $this.hasError = false;
    $this.options = options;
    $this.lb = Math.round($this.defaultValue * 2.2);
    $this.kg = $this.defaultValue;
    $this.$element.find('input.lb').val($this.lb);
    $this.$element.find('input.kg').val($this.kg);
    $this.ready = true;
    $this.update();
    $this.dirty = false;
  }
  dosageChart.prototype.onKeypress = function (e, isKg) {
    var key = e.charCode || e.keyCode || 0;
    // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
    // home, end, period, and numpad decimal
    var valueChanged = (
      key == 8 || //backspace
      key == 46 || //delete
      key == 110 || //num pad period
      key == 190 || //period
      (key >= 48 && key <= 57) || //numbers
      (key >= 96 && key <= 105) //number pad numbers
    );

    var valid = (
      valueChanged ||
      key == 9 || //tab
      key == 13 || //enter
      (key >= 35 && key <= 40) //end, home, arror left, arrow up, arrow right, arrow down
    );
    if (key === 38 || key === 40) {
      //up or down pressed
      var val = isKg ? this.$kg.val() : this.$lb.val();
      if (val.length) {
        var num = Number(val);
        if (!isNaN(num)) {
          num = num + (key === 38 ? 1 : -1);
          var kg = isKg ? num : num / 2.2;
          if (kg >= this.minWeight && kg <= this.maxWeight) {
            if (isKg) {
              this.$kg.val(num);
            } else {
              this.$lb.val(num);
            }
            valueChanged = true;
          }
        }
      }
    }
    if (valueChanged) //number pad numbers
    {
      //entered a number
      this.resetTimer(isKg);
    }
    return valid;
  };
  dosageChart.prototype.onLbKeyPress = function (e) {
    return this.onKeypress(e, false);
  };
  dosageChart.prototype.onKgKeyPress = function (e) {
    return this.onKeypress(e, true);
  };
  dosageChart.prototype.onLbChange = function (e) {
    this.onChange(Number(e.target.value), false);
  };
  dosageChart.prototype.onKgChange = function (e) {
    this.onChange(Number(e.target.value), true);
  };
  dosageChart.prototype.onChange = function (val, isKg) {
    this.hasError = false;
    var defaulted = false;
    if (isNaN(val)) {
      val = this.defaultValue;
      this.hasError = true;
      defaulted = true;
    } else if (!isKg) {
      val = val / 2.2;
    }
    if (val < this.minWeight || val > this.maxWeight) {
      this.hasError = true;
    }
    if (val != this.kg || !this.dirty) {
      this.dirty = true;
      this.kg = val;
      this.lb = this.kg * 2.2;
      if (!defaulted) {
        if (isKg) {
          this.$lb.val(Math.round(this.lb) + ""); //update the other value

        } else {
          this.$kg.val(Math.round(this.kg) + "");
        }
      }

      if (this.$error.hasClass(this.options.errorClass) != this.hasError) {
        if (this.hasError) {
          this.$error.addClass(this.options.errorClass);
        } else {
          this.$error.removeClass(this.options.errorClass);
        }
      }
      this.update();
    }
  };
  dosageChart.prototype.resetTimer = function (isKg) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(function () {
        var val = isKg ? this.$kg.val() : this.$lb.val();
        if (val.length) {
          var num = Number(val);
          if (!isNaN(num)) {
            this.onChange(num, isKg);
			return;
          }
        }
        this.hasError = true;
        this.updateText();
      }
        .bind(this), 200);
    if (!this.errorTimer) {
      this.errorTimer = setTimeout(function () {
          if (this.hasError && !this.$error.hasClass(this.options.errorClass)) {
            this.$error.addClass(this.options.errorClass);
          }
          this.errorTimer = null;
        }
          .bind(this), this.invalidTimer);
    }
  };

  dosageChart.prototype.update = function () {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.errorTimer) {
      clearTimeout(this.errorTimer);
      this.errorTimer = null;
    }
    this.updateText();
  };

  dosageChart.prototype.updateText = function () {
    if (this.ready) {
      var $this = this;
      this.$element.find('[dosage-col]').map(function (idx, col) {
        var $col = $(col),
        $row1 = $col.find("[dosage-row-1]"),
        row1Factor = ($row1.data() || {}).dosageFactor || 0,
        row1 = $this.kg * row1Factor,
        $row2 = $col.find("[dosage-row-2]"),
        row2Factor = ($row2.data() || {}).dosageFactor || 1,
        row2 = row1 / row2Factor,
        $row3 = $col.find("[dosage-row-3]"),
        row3Factor = ($row3.data() || {}).dosageFactor || 0,
        row3 = row2 * row3Factor;
        $row1.text($this.hasError ? '--' : (Math.ceil(row1) + ''));
        $row2.text($this.hasError ? '--' : (Math.ceil(row2) + ''));
        $row3.text($this.hasError ? '--' : ((Math.round(row3 * 10) / 10) + ''));
      });
    }
  };
  $.fn.dosageChart = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_dosageChart')) {
        $.data(this, 'plugin_dosageChart',
          new dosageChart(this, options || {}));
      }
    });
  };
})($);

/*** End of Dosage Chart ***/
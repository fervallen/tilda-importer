!function(t) {
  'function' == typeof define && define.amd ? define(['jquery'], t) : 'object' == typeof exports
    ? t(require('jquery'))
    : t(jQuery);
}(function(F) {
  var a, t = navigator.userAgent, k = /iphone/i.test(t), o = /chrome/i.test(t), _ = /android/i.test(t);
  F.mask = {
    definitions: {9: '[0-9]', a: '[A-Za-z]', 'а': '[А-Яа-яЁё]', '*': '[A-Za-zА-Яа-яЁё0-9]'},
    autoclear: !0,
    dataName: 'rawMaskFn',
    placeholder: '_'
  }, F.fn.extend({
    caret: function(t, e) {
      var r;
      if (0 !== this.length && !this.is(':hidden') && this.get(0) === document.activeElement) return 'number' ==
      typeof t ? (e = 'number' == typeof e ? e : t, this.each(function() {
        this.setSelectionRange ? this.setSelectionRange(t, e) : this.createTextRange &&
          ((r = this.createTextRange()).collapse(!0), r.moveEnd('character', e), r.moveStart('character',
            t), r.select());
      })) : (this[0].setSelectionRange ? (t = this[0].selectionStart, e = this[0].selectionEnd) : document.selection &&
        document.selection.createRange &&
        (r = document.selection.createRange(), t = 0 - r.duplicate().moveStart('character', -1e5), e = t +
          r.text.length), {begin: t, end: e});
    }, unmask: function() {return this.trigger('unmask');}, mask: function(e, y) {
      var r, g, v, j, b, $, x;
      if (!e && 0 < this.length) {
        var t = F(this[0]).data(F.mask.dataName);
        return t ? t() : void 0;
      }
      return y = F.extend({autoclear: F.mask.autoclear, placeholder: F.mask.placeholder, completed: null},
        y), r = F.mask.definitions, g = [], v = $ = e.length, j = null, e = String(e), F.each(e.split(''),
        function(t, e) {
          '?' == e ? ($--, v = t) : r[e] ? (g.push(new RegExp(r[e])), null === j && (j = g.length - 1), t < v &&
          (b = g.length - 1)) : g.push(null);
        }), this.trigger('unmask').each(function() {
        var n = F(this), s = F.map(e.split(''), function(t, e) {if ('?' != t) return r[t] ? c(e) : t;}), d = s.join(''),
          i = n.val();

        function l() {
          if (y.completed) {
            for (var t = j; t <= b; t++) if (g[t] && s[t] === c(t)) return;
            y.completed.call(n);
          }
        }

        function c(t) {return t < y.placeholder.length ? y.placeholder.charAt(t) : y.placeholder.charAt(0);}

        function m(t) {
          for (; ++t < $ && !g[t];) ;
          return t;
        }

        function u(t, e) {
          var r, a;
          if (!(t < 0)) {
            for (r = t, a = m(e); r < $; r++) if (g[r]) {
              if (!(a < $ && g[r].test(s[a]))) break;
              s[r] = s[a], s[a] = c(a), a = m(a);
            }
            w(), n.caret(Math.max(j, t));
          }
        }

        function p(t) {h(), n.val() != i && n.change();}

        function f(t, e) {
          var r;
          for (r = t; r < e && r < $; r++) g[r] && (s[r] = c(r));
        }

        function w() {n.val(s.join(''));}

        function h(t) {
          var e, r, a, o = n.val(), i = -1;
          for (a = e = 0; e < $; e++) if (g[e]) {
            for (s[e] = c(e); a++ < o.length;) if (r = o.charAt(a - 1), g[e].test(r)) {
              s[e] = r, i = e;
              break;
            }
            if (a > o.length) {
              f(e + 1, $);
              break;
            }
          } else s[e] === o.charAt(a) && a++, e < v && (i = e);
          return t ? w() : i + 1 < v
            ? y.autoclear || s.join('') === d ? (n.val() && n.val(''), f(0, $)) : w()
            : (w(), n.val(n.val().substring(0, i + 1))), v ? e : j;
        }

        n.data(F.mask.dataName,
          function() {return F.map(s, function(t, e) {return g[e] && t != c(e) ? t : null;}).join('');}), n.one('unmask',
          function() {n.off('.mask').removeData(F.mask.dataName);})
          .on('focus.mask', function() {
            var t;
            n.prop('readonly') || (clearTimeout(a), i = n.val(), t = h(), a = setTimeout(function() {
              n.get(0) === document.activeElement && (w(), t == e.replace('?', '').length ? n.caret(0, t) : n.caret(t));
            }, 10));
          })
          .on('blur.mask', p)
          .on('keydown.mask', function(t) {
            if (!n.prop('readonly')) {
              var e, r, a, o = t.which || t.keyCode;
              x = n.val(), 8 === o || 46 === o || k && 127 === o ? (r = (e = n.caret()).begin, (a = e.end) - r == 0 &&
              (r = 46 !== o ? function(t) {
                for (; 0 <= --t && !g[t];) ;
                return t;
              }(r) : a = m(r - 1), a = 46 === o ? m(a) : a), f(r, a), u(r, a - 1), t.preventDefault()) : 13 === o
                ? p.call(this, t)
                : 27 === o && (n.val(i), n.caret(0, h()), t.preventDefault());
            }
          })
          .on('keypress.mask', function(t) {
            if (!n.prop('readonly')) {
              var e, r, a, o = t.which || t.keyCode, i = n.caret();
              if (!(t.ctrlKey || t.altKey || t.metaKey || o < 32) && o && 13 !== o) {
                if (i.end - i.begin != 0 && (f(i.begin, i.end), u(i.begin, i.end - 1)), (e = m(i.begin - 1)) < $ &&
                (r = String.fromCharCode(o), g[e].test(r))) {
                  if (!function(t) {
                    var e, r, a, o;
                    for (r = c(e = t); e < $; e++) if (g[e]) {
                      if (a = m(e), o = s[e], s[e] = r, !(a < $ && g[a].test(o))) break;
                      r = o;
                    }
                  }(e), s[e] = r, w(), a = m(e), _) {
                    setTimeout(function() {F.proxy(F.fn.caret, n, a)();}, 0);
                  } else n.caret(a);
                  i.begin <= b && l();
                }
                t.preventDefault();
              }
            }
          })
          .on('input.mask paste.mask', function() {
            n.prop('readonly') || setTimeout(function() {
              var t = h(!0);
              n.caret(t), l();
            }, 0);
          }), o && _ && n.off('input.mask').on('input.mask', function(t) {
          function e() {F.proxy(F.fn.caret, n, a.begin, a.begin)();}

          var r = n.val(), a = n.caret();
          if (x && x.length && x.length > r.length) {
            for (var o = h(!0), i = a.end; 0 < i && !g[i - 1];) i--;
            0 === i && (i = o), a.begin = i, setTimeout(function() {e(), l();}, 0);
          } else a.begin = h(!0), setTimeout(function() {e(), l();}, 0);
        }), h();
      });
    }
  });
}), function($) {
  window.tildaBrowserLang = window.navigator.userLanguage ||
    window.navigator.language, window.tildaBrowserLang = window.tildaBrowserLang.toUpperCase(), -1 !=
  window.tildaBrowserLang.indexOf('RU')
    ? window.tildaBrowserLang = 'RU'
    : window.tildaBrowserLang = 'EN', window.scriptSysPayment = {}, window.handlerSysPayment = {}, window.tildaForm = {
    versionLib: '01.001',
    endpoint: 'gonzo.beer',
    isRecaptchaScriptInit: !1,
    currentFormProccessing: !1,
    arMessages: {
      EN: {
        success: 'Thank you! Your data has been submitted.',
        successorder: 'Thank you! Order created. Please wait. We are going to the payment...'
      },
      RU: {
        success: 'Спасибо! Данные успешно отправлены.',
        successorder: 'Спасибо! Заказ оформлен. Пожалуйста, подождите. Идет переход к оплате....'
      }
    },
    arValidateErrors: {
      EN: {
        email: 'Please put a correct e-mail',
        url: 'Please put a correct URL',
        phone: 'Please put a correct phone number',
        number: 'Please put a correct number',
        date: 'Please put a correct date',
        time: 'Please put a correct time (HH:mm)',
        name: 'Please put a name',
        namerus: 'Please put a correct name (only cyrillic letters)',
        nameeng: 'Please put a correct name (only latin letters)',
        string: 'You put incorrect symbols. Only letters, numbers and punctuation symbols are allowed',
        req: 'Please fill out all required fields',
        reqfield: 'Required field',
        minlength: 'Value is too short',
        maxlength: 'Value too big',
        emptyfill: 'None of the fields are filled in',
        chosevalue: 'Please select an address from the options'
      },
      RU: {
        email: 'Укажите, пожалуйста, корректный email',
        url: 'Укажите, пожалуйста, корректный URL',
        phone: 'Укажите, пожалуйста, корректный номер телефона',
        number: 'Укажите, пожалуйста, корректный номер',
        date: 'Укажите, пожалуйста, корректную дату',
        time: 'Укажите, пожалуйста, корректное время (ЧЧ:ММ)',
        name: 'Укажите, пожалуйста, имя',
        namerus: 'Укажите, пожалуйста, имя (только кириллица)',
        nameeng: 'Укажите, пожалуйста, имя (только латиница)',
        string: 'Вы написали некорректные символы. Разрешены только буквы, числа и знаки пунктуации',
        req: 'Пожалуйста, заполните все обязательные поля',
        minlength: 'Слишком короткое значение',
        maxlength: 'Слишком длинное',
        reqfield: 'Обязательное поле',
        emptyfill: 'Ни одно поле не заполнено',
        chosevalue: 'Пожалуйста, выберите адрес из предложенных вариантов'
      }
    }
  }, $(document).ready(function() {
    window.tildaForm.captchaCallback = function(t) {
      if (!window.tildaForm.currentFormProccessing || !window.tildaForm.currentFormProccessing.form) return !1;
      window.tildaForm.send(window.tildaForm.currentFormProccessing.form, window.tildaForm.currentFormProccessing.btn,
        window.tildaForm.currentFormProccessing.formtype,
        window.tildaForm.currentFormProccessing.formskey), window.tildaForm.currentFormProccessing = !1;
    }, window.tildaForm.validate = function(t) {
      var l = [], c = !0;
      if (t.find('.js-tilda-rule').each(function() {
        var t, e, r = $(this).data('tilda-req') || 0, a = $(this).data('tilda-rule') || 'none',
          o = $(this).data('tilda-rule-minlength') || 0, i = $(this).data('tilda-rule-maxlength') || 0, n = {},
          s = $(this).val(), d = '';
        if (n.obj = $(this), n.type = [], s && 0 < s.length) {
          try {
            d = s.replace(/[\s\u0000—\u001F\u2000-\u200F\uFEFF\u2028-\u202F\u205F-\u206F]/gi, '');
          } catch (t) {}
          s = s.trim();
        }
        if (0 < s.length && (c = !1), o = o && parseInt(o), i = i && parseInt(i), 1 == r &&
        (0 == s.length && 0 == d.length || ('checkbox' == $(this).attr('type') || 'radio' == $(this).attr('type')) &&
          0 == $(this).closest('form').find('[name="' + $(this).attr('name') + '"]:checked').length)) n.type.push(
          'req'); else {
          switch (a) {
            case'email':
              t = /^[a-zA-Zёа-яЁА-Я0-9_\.\-\+]{1,64}@[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}$/gi, 0 <
              s.length && !s.match(t) && n.type.push('email');
              break;
            case'url':
              t = /^((https?|ftp):\/\/)?[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéûşç0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéûşç0-9_\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}\/?$/gi, 0 <
              s.length &&
              ((e = (e = (e = s.split('//')) && 1 < e.length ? e[1] : e[0]).split('/')) && 0 < e.length && '' < e[0]
                ? (e = e[0]).match(t) || n.type.push('url')
                : (e && '' != e[0] || n.type.push('url'), e = ''));
              break;
            case'phone':
              t = /^[0-9\(\)\-\+]+$/gi, 0 < d.length && !d.match(t) ? n.type.push('phone') : (1 ==
                (e = d.replace(/[^0-9]+/g, '')).indexOf('000') || 1 == e.indexOf('111') || 1 == e.indexOf('222') &&
                '5' != e.substring(0, 1) || 1 == e.indexOf('333') || 1 == e.indexOf('444') || 1 == e.indexOf('555') &&
                '0' != e.substring(0, 1) || 1 == e.indexOf('666') && '0' != e.substring(0, 1) || 1 ==
                e.indexOf('8888') && '4' != e.substring(0, 1)) && n.type.push('phone');
              break;
            case'number':
              t = /^[0-9]+$/gi, 0 < d.length && !d.match(t) && n.type.push('number');
              break;
            case'date':
              t = /^[0-9]{1,4}[\-\.\/][0-9]{1,2}[\-\.\/][0-9]{1,4}$/gi, 0 < d.length && !d.match(t) &&
              n.type.push('date');
              break;
            case'time':
              t = /^[0-9]{2}[:\.][0-9]{2}$/gi, 0 < d.length && !d.match(t) && n.type.push('time');
              break;
            case'name':
              t = /^([ЁёäöüÄÖÜßèéûҐґЄєІіЇїӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶA-Za-z\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\u0041-\u007A\u00C0-\u02B8\uFB1D-\uFB1F\uFB2A-\uFB4E]{1,})([ЁёäöüÄÖÜßèéûҐґЄєІіЇїӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶA-Za-z\u0041-\u007A\u00C0-\u02B8\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\uFB1D-\uFB1F\uFB2A-\uFB4E\-\'\s\.]{0,})$/gi, 0 <
              s.length && !s.match(t) && n.type.push('name');
              break;
            case'nameeng':
              t = /^([A-Za-z\s]{1,}((\-)?[A-Za-z\.\s](\')?){0,})*$/i, 0 < s.length && !s.match(t) &&
              n.type.push('nameeng');
              break;
            case'namerus':
              t = /^([А-Яа-яЁё\s]{1,}((\-)?[А-Яа-яЁё\.\s](\')?){0,})*$/i, 0 < s.length && !s.match(t) &&
              n.type.push('namerus');
              break;
            case'string':
              t = /^[A-Za-zА-Яа-я0-9ЁёЁёäöüÄÖÜßèéûӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶ\u0041-\u007A\u00C0-\u02B8\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\uFB1D-\uFB1F\uFB2A-\uFB4E,\.:;\"\'\`\-\_\+\?\!\%\$\@\*\&\^\s]$/i, 0 <
              s.length && !s.match(t) && n.type.push('string');
              break;
            case'chosevalue':
              'true' === $(this).attr('data-option-selected') || n.type.push('chosevalue');
          }
          0 < o && 0 < s.length && s.length < o && n.type.push('minlength'), 0 < i && 0 < s.length && s.length > i &&
          n.type.push('maxlength');
        }
        n.type && 0 < n.type.length && (l[l.length] = n);
      }), 'y' === t.attr('data-formcart')) {
        var e, r = void 0 !== window.tcart_minorder && 0 < window.tcart_minorder,
          a = void 0 !== window.tcart_mincntorder && 0 < window.tcart_mincntorder;
        if (r) if (!(window.tcart.prodamount >= window.tcart_minorder)) (e = {}).obj = $({}), e.type = [], e.type.push(
          'minorder'), l.push(e);
        if (a) if (!(window.tcart.total >= window.tcart_mincntorder)) (e = {}).obj = $({}), e.type = [], e.type.push(
          'minquantity'), l.push(e);
      }
      return c && 0 == l.length && (l = [{obj: 'none', type: ['emptyfill']}]), l;
    }, window.tildaForm.hideErrors = function(t) {
      t.find('.js-errorbox-all').hide(), t.find('.js-rule-error')
        .hide(), t.find('.js-error-rule-all').html(''), t.find('.js-successbox').hide(), t.find(
        '.js-error-control-box .t-input-error').html(''), t.find('.js-error-control-box')
        .removeClass('js-error-control-box'), t.removeClass('js-send-form-error'), t.removeClass(
        'js-send-form-success');
      var e = $('#tilda-popup-for-error');
      0 < e.length && e.fadeOut();
    }, window.tildaForm.showErrorInPopup = function(t, e) {
      if (!e || 0 == e.length) return !1;
      var r = t.data('inputbox');
      r = r || '.blockinput';
      var a, o, i, n = window.tildaForm.arValidateErrors[window.tildaBrowserLang] || {}, s = '', d = '',
        l = $('#tilda-popup-for-error');
      0 == l.length && ($('body')
        .append(
          '<div id="tilda-popup-for-error" class="js-form-popup-errorbox tn-form__errorbox-popup" style="display: none;"> <div class="t-form__errorbox-text t-text t-text_xs"> error </div> <div class="tn-form__errorbox-close js-errorbox-close"> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-left"></div> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-right"></div> </div> </div>'), l = $(
        '#tilda-popup-for-error'), $('#tilda-popup-for-error')
        .on('click', '.js-errorbox-close',
          function(t) {return t.preventDefault(), $('#tilda-popup-for-error').fadeOut(), !1;})), d = '';
      for (var c = 0; c < e.length; c++) if (e[c] && e[c].obj) {
        if (0 == c && 'none' == e[c].obj) {
          d = '<p class="t-form__errorbox-item">' + n.emptyfill + '</p>';
          break;
        }
        for ((o = 0) < (a = e[c].obj.closest(r).addClass('js-error-control-box')).find('.t-input-error').length &&
             (o = 1), j = 0; j < e[c].type.length; j++) error = e[c].type[j], s = '', 0 <
        (i = t.find('.js-rule-error-' + error)).length ? '' == i.text() && '' < n[error] ? -1 == d.indexOf(n[error]) &&
          (d = d + '<p class="t-form__errorbox-item">' + n[error] + '</p>') : (s = i.eq(0).text(), -1 ==
        d.indexOf(n[error]) && (d = d + '<p class="t-form__errorbox-item">' + i.eq(0).text() + '</p>')) : '' <
          n[error] && -1 == d.indexOf(n[error]) &&
          (d = d + '<p class="t-form__errorbox-item">' + n[error] + '</p>'), o &&
        ('' == s && ('' < n[error + 'field'] ? s = n[error + 'field'] : '' < n[error] && (s = n[error])), '' < s &&
        (a.find('.t-input-error').html(s), a.find('.t-input-error').fadeIn()));
      }
      return '' < d &&
      (l.find('.t-form__errorbox-text').html(d), l.css('display', 'block').fadeIn(), l.find('.t-form__errorbox-item')
        .fadeIn()), window.errorTimerID &&
      window.clearTimeout(window.errorTimerID), window.errorTimerID = window.setTimeout(function() {
        $('#tilda-popup-for-error').fadeOut(), t.find('.t-input-error')
          .html('')
          .fadeOut(), window.errorTimerID = 0;
      }, 1e4), t.off('focus change', '.js-tilda-rule'), t.on('focus change', '.js-tilda-rule', function() {
        $('#tilda-popup-for-error').fadeOut(), $(this)
          .closest('form')
          .find('.t-input-error')
          .html('')
          .fadeOut(), window.errorTimerID && (window.clearTimeout(window.errorTimerID), window.errorTimerID = 0);
      }), t.trigger('tildaform:aftererror'), !0;
    }, window.tildaForm.showErrors = function(t, e) {
      if (!e || 0 == e.length) return !1;
      if ('y' == t.data('error-popup')) return tildaForm.showErrorInPopup(t, e);
      var r = t.data('inputbox');
      r = r || '.blockinput';
      for (var a, o, i, n = window.tildaForm.arValidateErrors[window.tildaBrowserLang] || {}, s = '', d = 0; d <
      e.length; d++) if (e[d] && e[d].obj) {
        if (0 == d && 'none' == e[d].obj) {
          (i = t.find('.js-rule-error-all')).html(n.emptyfill), i.css('display', 'block').show();
          break;
        }
        for ((o = 0) < (a = e[d].obj.closest(r).addClass('js-error-control-box')).find('.t-input-error').length &&
             (o = 1), j = 0; j < e[d].type.length; j++) error = e[d].type[j], s = '', (i = t.find(
          '.js-rule-error-' + error)).attr('data-rule-filled') ? i.css('display', 'block').show() : 0 < i.length
          ? ('' == i.text() && '' < n[error] ? i.html(n[error]) : s = i.eq(0).text(), i.css('display', 'block').show())
          : '' < n[error] && (i = t.find('.js-rule-error-all')) && 0 < i.length &&
          (i.html(n[error]), i.css('display', 'block').show()), o &&
        ('' == s && ('' < n[error + 'field'] ? s = n[error + 'field'] : '' < n[error] && (s = n[error])), '' < s &&
        a.find('.t-input-error').html(s));
      }
      return t.find('.js-errorbox-all').css('display', 'block').show(), t.trigger('tildaform:aftererror'), !0;
    }, checkVerifyTildaCaptcha = function(t) {
      if (-1 != t.origin.indexOf(window.tildaForm.endpoint)) {
        if ('closeiframe' == t.data) return $('#tildaformcaptchabox')
          .remove(), void $('#js-tildaspec-captcha').remove();
        var e = t.data, r = $('#js-tildaspec-captcha');
        r && 0 < r.length && (r.val(e), $('#tildaformcaptchabox').remove(), r.closest('form').trigger('submit'));
      }
    }, window.tildaForm.addPaymentInfoToForm = function(t) {
      t.find('.js-tilda-payment').remove();
      var e, r, a, o = 0;
      window.tildaForm.tildapayment = {}, window.tildaForm.arProductsForStat = [], window.tildaForm.orderIdForStat = '', window.tildaForm.amountForStat = 0, window.tildaForm.currencyForStat = '';
      var i = $('#allrecords').data('tilda-currency') || $('.t706').data('project-currency-code') || '';
      if (i
        ? (window.tildaForm.currencyForStat = i, window.tildaForm.tildapayment.currency = i)
        : window.tcart.currency && '' < window.tcart.currency &&
        (window.tildaForm.currencyForStat = window.tcart.currency, window.tildaForm.tildapayment.currency = window.tcart.currency), !window.tcart.delivery &&
      $('.t-radio_delivery:checked').length && 0 < $('.t-radio_delivery:checked')
        .data(
          'delivery-price')) try {return window.tildaForm.tildapayment = !1, window.location.reload(), !1;} catch (t) {}
      window.tildaForm.amountForStat = window.tcart.amount, window.tildaForm.tildapayment.amount = window.tcart.amount, window.tcart.system &&
      '' < window.tcart.system
        ? window.tildaForm.tildapayment.system = window.tcart.system
        : window.tildaForm.tildapayment.system = 'auto', window.tcart.promocode && '' <
      window.tcart.promocode.promocode &&
      (window.tildaForm.tildapayment.promocode = window.tcart.promocode.promocode, window.tcart.prodamount_discountsum &&
      0 < parseFloat(window.tcart.prodamount_discountsum)
        ? (window.tildaForm.tildapayment.discount = window.tcart.prodamount_discountsum, o = window.tcart.prodamount_discountsum)
        : window.tcart.amount_discountsum && 0 < parseFloat(window.tcart.amount_discountsum) &&
        (o = window.tcart.amount_discountsum, window.tildaForm.tildapayment.discount = window.tcart.amount_discountsum), window.tcart.prodamount_withdiscount &&
      0 < parseFloat(window.tcart.prodamount_withdiscount) &&
      (window.tildaForm.tildapayment.prodamount_withdiscount = window.tcart.prodamount_withdiscount), window.tcart.amount_withoutdiscount &&
      0 < parseFloat(window.tcart.amount_withoutdiscount) &&
      (window.tildaForm.tildapayment.amount_withoutdiscount = window.tcart.amount_withoutdiscount)), window.tcart.prodamount &&
      0 < parseFloat(window.tcart.prodamount) && (window.tildaForm.tildapayment.prodamount = window.tcart.prodamount);
      var n = (new Date).getTimezoneOffset();
      window.tildaForm.tildapayment.timezoneoffset = n;
      var s, d, l = 0;
      for (window.tcart.products && 0 < window.tcart.products.length &&
           (l = window.tcart.products.length), window.tildaForm.tildapayment.products = [], r = 0; r < l; r += 1) {
        for (a in e = window.tcart.products[r], s = {}, d = '', window.tildaForm.tildapayment.products[r] = {}, e) if ('function' !=
          typeof e[a]) if ('options' ==
          a) for (var c in window.tildaForm.tildapayment.products[r][a] = {}, e[a]) void 0 ===
        window.tildaForm.tildapayment.products[r][a][c] &&
        (window.tildaForm.tildapayment.products[r][a][c] = {}), e[a][c].option &&
        (window.tildaForm.tildapayment.products[r][a][c].option = e[a][c].option), e[a][c].price && 0 < e[a][c].price &&
        (window.tildaForm.tildapayment.products[r][a][c].price = e[a][c].price), e[a][c].variant &&
        (window.tildaForm.tildapayment.products[r][a][c].variant = e[a][c].variant), e[a][c].option &&
        e[a][c].variant && ('' < d && (d += ', '), d = d + e[a][c].option + ':' +
          e[a][c].variant); else window.tildaForm.tildapayment.products[r][a] = e[a];
        e.sku ? s.id = e.sku : e.uid && (s.id = e.uid), s.name = e.name, e.price
          ? (s.price = e.price, s.quantity = parseInt(e.amount / e.price))
          : e.quantity && 1 < e.quantity
            ? (s.price = e.amount / e.quantity, s.quantity = e.quantity)
            : (s.price = e.amount, s.quantity = 1), s.name = e.name, '' < d &&
        (s.name = s.name + '(' + d + ')'), e.sku && (s.sku = e.sku), e.uid &&
        (s.uid = e.uid), window.tildaForm.arProductsForStat.push(s);
      }
      window.tcart.delivery && window.tcart.delivery.name &&
      (window.tildaForm.tildapayment.delivery = {name: window.tcart.delivery.name}, window.tcart.delivery &&
      window.tcart.delivery.price &&
      (pricedelivery = window.tcart.delivery.price, window.tildaForm.tildapayment.delivery.price = window.tcart.delivery.price, 0 <
      window.tcart.prodamount && void 0 !== window.tcart.delivery.freedl && 0 < window.tcart.delivery.freedl &&
      (window.tildaForm.tildapayment.delivery.freedl = window.tcart.delivery.freedl, window.tcart.prodamount - o >=
      window.tcart.delivery.freedl && (pricedelivery = 0)), s = {
        name: window.tcart.delivery.name,
        price: pricedelivery,
        quantity: 1,
        id: 'delivery'
      }, window.tildaForm.arProductsForStat.push(s)));
      try {
        [
          'city',
          'street',
          'pickup-name',
          'pickup-address',
          'pickup-id',
          'house',
          'entrance',
          'floor',
          'aptoffice',
          'phone',
          'entrancecode',
          'comment',
          'service-id',
          'hash',
          'postalcode',
          'country'
        ].forEach(function(t) {
          window.tcart.delivery && window.tcart.delivery[t] &&
          (window.tildaForm.tildapayment.delivery[t] = window.tcart.delivery[t]);
        });
      } catch (t) {console.log(t);}
      t.append('');
    }, window.tildaForm.clearTCart = function(t) {
      if ('y' == t.data('formcart')) {
        if (window.tcart = {
          amount: 0,
          currency: '',
          system: '',
          products: []
        }, window.tcart.system = 'none', 'object' == typeof localStorage) try {
          localStorage.removeItem('tcart');
        } catch (t) {console.log('Your web browser does not support localStorage.');}
        try {delete window.tcart, tcart__loadLocalObj();} catch (t) {}
        window.tcart_success = 'yes';
      }
    }, window.tildaForm.payment = function($jform, arNext) {
      var html = '';
      if ('y' != $jform.data('formpaymentoff')) {
        if (0 < $jform.find('.js-successbox').length) {
          '' < $jform.find('.js-successbox').text() &&
          $jform.data('successmessage', $jform.find('.js-successbox').text());
          var arMessage = window.tildaForm.arMessages[window.tildaBrowserLang] || {};
          arMessage.successorder && $jform.find('.js-successbox').html(arMessage.successorder), $jform.find(
            '.js-successbox').show();
        }
        if ($jform.addClass('js-send-form-success'), 'link' == arNext.type) return tildaForm.clearTCart(
          $jform), arNext.message && '' < arNext.message && 0 < $jform.find('.js-successbox').length &&
        ($jform.find('.js-successbox').html(arNext.message), $jform.find('.js-successbox')
          .show()), window.location.href = arNext.value, !0;
        if ('form' == arNext.type) {
          tildaForm.clearTCart($jform), $('#js-tilda-payment-formid').remove();
          var key = '', val = '';
          for (key in html = '<form id="js-tilda-payment-formid" action="' + arNext.value.action +
            '" method="post"  style="position:absolue;opacity:0;width: 1px; height: 1px; left: -5000px;">', arNext.value.action = '', arNext.value) val = arNext.value[key], 'function' !=
          typeof val && '' < val && (html += '<input type=\'hidden\' name=\'' + key + '\' value=\'' + val + '\' >');
          html += '</form>', $('body').append(html), $('#js-tilda-payment-formid').submit();
        } else {
          if ('function' == arNext.type) {
            var arArgs = arNext.value.args;
            return arNext.value.functioncode ? tildaForm.paysystemRun(arNext.value.script, arNext.value.sysname, $jform,
              arNext.value.functioncode, arArgs) : eval(arNext.value.name + '($jform, arArgs);'), !1;
          }
          tildaForm.clearTCart($jform), 'text' == arNext.type && arNext.message && '' < arNext.message && 0 <
          $jform.find('.js-successbox').length &&
          ($jform.find('.js-successbox').html(arNext.message), $jform.find('.js-successbox').show());
        }
      } else tildaForm.clearTCart($jform);
    }, window.tildaForm.paysystemScriptLoad = function(t, e) {
      if (!e || !t || 'http' != t.substring(0, 4)) return console.log('Wrong script parameters.'), !1;
      if (window.scriptSysPayment || (window.scriptSysPayment = {}), !window.scriptSysPayment[e] || !0 !==
      window.scriptSysPayment[e]) {
        var r = document.createElement('script');
        r.type = 'text/javascript', r.src = t, document.body.appendChild(r), window.scriptSysPayment[e] = !0;
      }
    }, window.tildaForm.paysystemRun = function(
      script, sysname, $jform, functioncode, arArgs) {
      if (window.scriptSysPayment || (window.scriptSysPayment = {}), !window.scriptSysPayment[sysname] || !0 !==
      window.scriptSysPayment[sysname]) return window.tildaForm.paysystemScriptLoad(script, sysname), window.setTimeout(
        function() {window.tildaForm.paysystemRun(script, sysname, $jform, functioncode, arArgs);}, 200), !1;
      eval(functioncode);
    }, window.tildaForm.paysystemSuccess = function(t, e) {
      window.tildaForm.clearTCart(t);
      var r = '/tilda/' + t.attr('id') + '/payment/', a = 'Pay order in form ' + t.attr('id'), o = e.amount,
        i = e.description;
      window.Tilda && 'function' == typeof Tilda.sendEventToStatistics &&
      ($('#allrecords').data('tilda-currency') || $('.t706').data('project-currency-code') ||
      $('#allrecords').data('tilda-currency', e.currency), Tilda.sendEventToStatistics(r, a, i, o));
      '' < e.successurl && window.setTimeout(function() {window.location.href = e.successurl;}, 300), '' <
      t.data('successmessage') ? t.find('.js-successbox').html(t.data('successmessage')) : t.find('.js-successbox')
        .html(''), t.data('successmessage', '');
      var n = t.data('success-callback');
      window.tildaForm.successEnd(t, e.successurl, n), t.trigger('tildaform:aftersuccess');
    }, window.tildaForm.stripeLoad = function() {
      if (!0 !== window.stripeapiiscalled) {
        var t = document.createElement('script');
        t.type = 'text/javascript', t.src = 'https://checkout.stripe.com/checkout.js', document.body.appendChild(
          t), window.stripeapiiscalled = !0;
      }
    }, window.tildaForm.stripePay = function(n, s) {
      if (!0 !== window.stripeapiiscalled) return window.tildaForm.stripeLoad(), window.setTimeout(
        function() {window.tildaForm.stripePay(n, s);}, 200), !1;
      var t = s.companyname, e = s.companylogo;
      if (t = t || window.location.host, !window.stripehandler) {
        if ('object' != typeof window.StripeCheckout) return window.setTimeout(
          function() {window.tildaForm.stripePay(n, s);}, 200), !1;
        var r = {key: s.accountid, image: e, name: t, locale: 'auto'};
        s.zipCode && 1 == s.zipCode && (r.zipCode = !0), s.billingAddress && 1 == s.billingAddress &&
        (r.billingAddress = !0), s.shipping && 1 == s.shipping &&
        (r.shippingAddress = !0), window.stripehandler = window.StripeCheckout.configure(r), $(window)
          .on('popstate', function() {window.stripehandler.close();});
      }
      window.tildaForm.orderIdForStat = s.invoiceid;
      var a = 100;
      try {s.multiple && 0 < s.multiple && (a = parseInt(s.multiple));} catch (t) {}
      window.stripehandler.open({
        name: t,
        image: e,
        description: s.description,
        amount: parseInt(parseFloat(s.amount) * a),
        currency: s.currency,
        shippingAddress: '1' == s.shipping,
        email: '' < s.email ? s.email : '',
        token: function(t, e) {
          t && t.id && $.ajax({
            type: 'POST',
            url: 'https://' + window.tildaForm.endpoint + '/payment/stripe/',
            data: {
              projectid: s.projectid,
              invoiceid: s.invoiceid,
              token: t.id,
              email: t.email,
              currency: s.currency,
              amount: parseInt(parseFloat(s.amount) * a)
            },
            dataType: 'json',
            xhrFields: {withCredentials: !1},
            success: function(t) {
              window.tildaForm.clearTCart(n);
              var e = '/tilda/' + n.attr('id') + '/payment/', r = 'Pay order in form ' + n.attr('id'), a = s.amount,
                o = s.description;
              window.Tilda && 'function' == typeof Tilda.sendEventToStatistics &&
              ($('#allrecords').data('tilda-currency') || $('.t706').data('project-currency-code') ||
              $('#allrecords').data('tilda-currency', s.currency), Tilda.sendEventToStatistics(e, r, o, a));
              '' < s.successurl && window.setTimeout(function() {window.location.href = s.successurl;}, 300), '' <
              n.data('successmessage') ? n.find('.js-successbox').html(n.data('successmessage')) : n.find(
                '.js-successbox').html(''), n.data('successmessage', '');
              var i = n.data('success-callback');
              window.tildaForm.successEnd(n, s.successurl, i), n.trigger('tildaform:aftersuccess');
            },
            fail: function() {},
            timeout: 15e3
          });
        }
      });
    }, window.tildaForm.cloudpaymentLoad = function() {
      if (!0 !== window.cloudpaymentsapiiscalled) {
        var t = document.createElement('script');
        t.type = 'text/javascript', t.src = 'https://widget.cloudpayments.ru/bundles/cloudpayments', document.body.appendChild(
          t), window.cloudpaymentsapiiscalled = !0;
      }
    }, window.tildaForm.cloudpaymentPay = function(n, s) {
      if (!0 !== window.cloudpaymentsapiiscalled) return window.tildaForm.cloudpaymentLoad(), window.setTimeout(
        function() {window.tildaForm.cloudpaymentPay(n, s);}, 200), !1;
      var d = s.currency, t = s.language, e = {};
      if (t = t || ('RUB' == d || 'BYR' == d || 'BYN' == d || 'RUR' == d ? 'ru-RU' : 'UAH' == d
        ? 'uk'
        : 'en-US'), !window.cloudpaymentshandler) {
        if ('object' != typeof window.cp) return window.setTimeout(function() {window.tildaForm.cloudpaymentPay(n, s);},
          200), !1;
        e = {language: t}, s.applePaySupport && 'off' == s.applePaySupport &&
        (e.applePaySupport = !1), s.googlePaySupport && 'off' == s.googlePaySupport &&
        (e.googlePaySupport = !1), window.cloudpaymentshandler = new cp.CloudPayments(e);
      }
      var r = {};
      r.projectid = s.projectid, s.cloudPayments && (s.cloudPayments.recurrent || s.cloudPayments.customerReceipt) &&
      (r.cloudPayments = s.cloudPayments);
      var l = n.closest('.t-popup_show');
      return l && 0 != l.length || (l = n.closest('.t706__cartwin_showed')), l.data('old-style',
        l.attr('style')), l.attr('style', 'z-index:100'), window.tildaForm.orderIdForStat = s.invoiceId, s.skin ||
      (s.skin = 'classic'), window.cloudpaymentshandler.charge({
        publicId: s.publicId,
        description: s.description,
        amount: parseFloat(s.amount),
        currency: d,
        accountId: s.accountId,
        invoiceId: s.invoiceId,
        requireEmail: 1 == s.requireEmail,
        email: s.email,
        skin: s.skin,
        data: r
      }, function(t) {
        window.cloudpaymentshandler = !1, l.attr('style', l.data('old-style'));
        var e = '/tilda/' + n.attr('id') + '/payment/', r = 'Pay order in form ' + n.attr('id'), a = s.amount,
          o = s.description;
        $('#allrecords').data('tilda-currency', d), window.Tilda && 'function' == typeof Tilda.sendEventToStatistics &&
        Tilda.sendEventToStatistics(e, r, o, a), window.tildaForm.clearTCart(n), '' < s.successurl &&
        window.setTimeout(function() {window.location.href = s.successurl;}, 300), '' < n.data('successmessage')
          ? n.find('.js-successbox').html(n.data('successmessage'))
          : n.find('.js-successbox').html(''), n.data('successmessage', '');
        var i = n.data('success-callback');
        window.tildaForm.successEnd(n, s.successurl, i), n.trigger('tildaform:aftersuccess');
      }, function(t, e) {
        if (l.attr('style', l.data('old-style')), n.find('.js-successbox').hide(), '' < n.data('successmessage')
          ? n.find('.js-successbox').html(n.data('successmessage'))
          : n.find('.js-successbox').html(''), n.data('successmessage', ''), window.cloudpaymentshandler = !1, '' <
        s.failureurl) window.location.href = s.failureurl; else {
          l.find('.t706__cartwin-products').show(), l.find('.t706__cartwin-prodamount-wrap').show(), l.find(
            '.t706__form-bottom-text').show(), n.find('.t-form__inputsbox').show();
          try {tcart__lockScroll();} catch (t) {}
        }
      }), !1;
    }, window.tildaForm.sendStatAndShowMessage = function($jform, arArgs, sendStat) {
      if (sendStat) {
        var virtPage = '/tilda/' + $jform.attr('id') + '/payment/',
          virtTitle = 'Pay order in form ' + $jform.attr('id'), virtPrice = arArgs.amount,
          virtProduct = arArgs.description;
        if (window.Tilda && 'function' == typeof Tilda.sendEventToStatistics) {
          var currency = $('#allrecords')
            .data('tilda-currency') || $('.t706').data('project-currency-code');
          currency || $('#allrecords').data('tilda-currency', arArgs.currency), Tilda.sendEventToStatistics(virtPage,
            virtTitle, virtProduct, virtPrice);
        }
      }
      if (0 < $jform.find('.js-successbox').length) {
        if ('y' == $jform.data('success-popup') && $jform.find('.js-successbox').hide(), arArgs.successmessage && '' <
        arArgs.successmessage) $jform.find('.js-successbox').html(arArgs.successmessage); else if ('' <
          $jform.data('successmessage')) $jform.find('.js-successbox')
          .html($jform.data('successmessage')); else {
          var arMessage = window.tildaForm.arMessages[window.tildaBrowserLang] || {};
          arMessage.success ? $jform.find('.js-successbox').html(arMessage.success) : $jform.find('.js-successbox')
            .html('');
        }
        $jform.data('successmessage', ''), 'y' == $jform.data('success-popup') ? window.tildaForm.showSuccessPopup(
          $jform.find('.js-successbox').html()) : $jform.find('.js-successbox').show();
      }
      $jform.addClass('js-send-form-success'), window.tildaForm.clearTCart($jform), '' < arArgs.successurl &&
      window.setTimeout(function() {window.location.href = arArgs.successurl;}, 300);
      var successcallback = $jform.data('success-callback');
      successcallback && 0 < successcallback.length && eval(successcallback + '($jform)'), $jform.find(
        'input[type=text]:visible').val(''), $jform.find('textarea:visible').html(''), $jform.find('textarea:visible')
        .val(''), $jform.data('tildaformresult', {tranid: '0', orderid: '0'}), $jform.trigger('tildaform:aftersuccess');
    }, window.tildaForm.banktransferPay = function(e, r) {
      if (r && 'fast' == r.condition) window.tildaForm.sendStatAndShowMessage(e, r, !0); else if (r && '' < r.html) {
        $('#allrecords').append(r.html), $('.t-banktransfer .t-popup__close').off('click'), $(
          '.t-banktransfer .t-popup__close')
          .click(function() {
            $('body').removeClass('t-body_popupshowed'), $('.t-banktransfer').remove();
            try {'function' == typeof tcart__closeCart && tcart__closeCart();} catch (t) {}
            return !1;
          }), $('body').addClass('t-body_popupshowed');
        var a, o = $('#formbanktransfer');
        0 < o.length &&
        (o.off('submit'), o.find('.t-submit').off('click'), o.find('.t-submit').off('dblclick'), o.submit(function(t) {
          if (t.preventDefault(), (a = window.tildaForm.validate(o)) && 0 <
          a.length) return window.tildaForm.showErrors(o, a), !1;
          $.ajax({
            type: 'POST',
            url: 'https://' + window.tildaForm.endpoint + '/payment/banktransfer/',
            data: o.serialize(),
            dataType: 'json',
            xhrFields: {withCredentials: !1},
            success: function(t) {
              if ($('body').removeClass('t-body_popupshowed'), o.closest('.t-banktransfer')
                .remove(), (t = t || {error: 'Unknown error. Please reload page and try again later.'}) &&
              t.error) return alert(t.error), !1;
              window.tildaForm.sendStatAndShowMessage(e, r, !0);
            },
            error: function(t) {$('body').removeClass('t-body_popupshowed'), o.remove(), alert(t);},
            timeout: 15e3
          });
        }));
      } else window.tildaForm.sendStatAndShowMessage(e, r, !0);
    }, window.tildaForm.closeSuccessPopup = function() {
      var t = $('#tildaformsuccesspopup');
      0 < t.length &&
      ($('body').removeClass('t-body_success-popup-showed'), /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
      !window.MSStream && window.tildaForm.unlockBodyScroll(), t.fadeOut('fast'));
    }, window.tildaForm.lockBodyScroll = function() {
      var t = $('body');
      if (!t.hasClass('t-body_scroll-locked')) {
        var e = void 0 !== window.pageYOffset
          ? window.pageYOffset
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        t.addClass('t-body_scroll-locked'), t.css('top', '-' + e + 'px'), t.attr('data-popup-scrolltop', e);
      }
    }, window.tildaForm.unlockBodyScroll = function() {
      var t = $('body');
      if (t.hasClass('t-body_scroll-locked')) {
        var e = $('body').attr('data-popup-scrolltop');
        t.removeClass('t-body_scroll-locked'), t.css('top', ''), t.removeAttr('data-popup-scrolltop'), window.scrollTo(
          0, e);
      }
    }, window.tildaForm.showSuccessPopup = function(t) {
      var e = '', r = $('#tildaformsuccesspopup');
      0 == r.length &&
      (e = '<style media="screen"> .t-form-success-popup { display: none; position: fixed; background-color: rgba(0,0,0,.8); top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000; overflow-y: auto; cursor: pointer; } .t-body_success-popup-showed { height: 100vh; min-height: 100vh; overflow: hidden; } .t-form-success-popup__window { width: 100%; max-width: 400px; position: absolute; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); left: 0px; right: 0px; margin: 0 auto; padding: 20px; box-sizing: border-box; } .t-form-success-popup__wrapper { background-color: #fff; padding: 40px 40px 50px; box-sizing: border-box; border-radius: 5px; text-align: center; position: relative; cursor: default; } .t-form-success-popup__text { padding-top: 20px; } .t-form-success-popup__close-icon { position: absolute; top: 14px; right: 14px; cursor: pointer; } @media screen and (max-width: 480px) { .t-form-success-popup__text { padding-top: 10px; } .t-form-success-popup__wrapper { padding-left: 20px; padding-right: 20px; } } </style>', e += '<div class="t-form-success-popup" style="display:none;" id="tildaformsuccesspopup"> <div class="t-form-success-popup__window"> <div class="t-form-success-popup__wrapper"> <svg class="t-form-success-popup__close-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="t657__icon-close" viewBox="0 0 23 23"> <g fill-rule="evenodd"> <path d="M0 1.41L1.4 0l21.22 21.21-1.41 1.42z"/> <path d="M21.21 0l1.42 1.4L1.4 22.63 0 21.21z"/> </g> </svg> <svg width="50" height="50" fill="#62C584"> <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z"/> <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z"/> </svg> <div class="t-form-success-popup__text t-descr t-descr_sm" id="tildaformsuccesspopuptext"> Thank You! </div> </div> </div> </div>', $(
        'body').append(e), (r = $('#tildaformsuccesspopup')).click(
        function(t) {t.target == this && window.tildaForm.closeSuccessPopup();}), r.find(
        '.t-form-success-popup__close-icon').click(function(t) {window.tildaForm.closeSuccessPopup();}), $(document)
        .keydown(function(t) {27 == t.keyCode && window.tildaForm.closeSuccessPopup();})), $(
        '#tildaformsuccesspopuptext').html(t), r.fadeIn('fast'), $('body')
        .addClass('t-body_success-popup-showed'), /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream &&
      setTimeout(function() {window.tildaForm.lockBodyScroll();}, 500);
    }, window.tildaForm.successEnd = function($jform, successurl, successcallback) {
      if (0 < $jform.find('.js-successbox').length) {
        if ('' == $jform.find('.js-successbox').text()) {
          var arMessage = window.tildaForm.arMessages[window.tildaBrowserLang] || {};
          arMessage.success && $jform.find('.js-successbox').html(arMessage.success);
        }
        'y' == $jform.data('success-popup')
          ? window.tildaForm.showSuccessPopup($jform.find('.js-successbox').html())
          : $jform.find('.js-successbox').show();
      }
      $jform.addClass('js-send-form-success'), successcallback && 0 < successcallback.length ? eval(
        successcallback + '($jform)') : successurl && 0 < successurl.length &&
        setTimeout(function() {window.location.href = successurl;}, 500), tildaForm.clearTCart($jform), $jform.find(
        'input[type=text]:visible').val(''), $jform.find('textarea:visible').html(''), $jform.find('textarea:visible')
        .val(''), $jform.data('tildaformresult', {tranid: '0', orderid: '0'});
    }, window.tildaForm.send = function($jform, btnformsubmit, formtype, formskey) {
      if (window.tildaForm.tildapayment = !1, ('y' == $jform.data('formcart') || 0 <
        $jform.closest('.t706__orderform').length) && window.tildaForm.addPaymentInfoToForm($jform), 2 == formtype ||
      !formtype && '' < formskey) {
        var $inputElem;
        $inputElem = $jform.find('input[name=tildaspec-cookie]'), $inputElem && 0 != $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-cookie" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-cookie]')), 0 < $inputElem.length &&
        $inputElem.val(document.cookie), $inputElem = $jform.find('input[name=tildaspec-referer]'), $inputElem && 0 !=
        $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-referer" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-referer]')), 0 < $inputElem.length &&
        $inputElem.val(window.location.href), $inputElem = $jform.find('input[name=tildaspec-formid]'), $inputElem &&
        0 != $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-formid" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-formid]')), 0 < $inputElem.length && $inputElem.val($jform.attr('id')), '' < formskey &&
        ($inputElem = $jform.find('input[name=tildaspec-formskey]'), $inputElem && 0 != $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-formskey" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-formskey]')), 0 < $inputElem.length &&
        $inputElem.val(formskey)), $inputElem = $jform.find('input[name=tildaspec-version-lib]'), $inputElem && 0 !=
        $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-version-lib" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-version-lib]')), 0 < $inputElem.length &&
        $inputElem.val(window.tildaForm.versionLib), $inputElem = $jform.find(
          'input[name=tildaspec-pageid]'), $inputElem && 0 != $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-pageid" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-pageid]')), 0 < $inputElem.length &&
        $inputElem.val($('#allrecords').data('tilda-page-id')), $inputElem = $jform.find(
          'input[name=tildaspec-projectid]'), $inputElem && 0 != $inputElem.length ||
        ($jform.append('<input type="hidden" name="tildaspec-projectid" value="">'), $inputElem = $jform.find(
          'input[name=tildaspec-projectid]')), 0 < $inputElem.length &&
        $inputElem.val($('#allrecords').data('tilda-project-id')), $jform.find('.js-form-spec-comments')
          .val(''), $formurl = 'https://' + window.tildaForm.endpoint + '/procces/';
        var d = {};
        if (d = $jform.serializeArray(), d = d.filter(
          function(t) {return -1 === t.name.indexOf('tildadelivery-');}), window.tildaForm.tildapayment &&
        window.tildaForm.tildapayment.products) d.push(
          {name: 'tildapayment', value: JSON.stringify(window.tildaForm.tildapayment)}); else if (0 <
          $jform.closest('.t706__orderform').length) return !1;
        var tsstartrequest = Date.now();
        return $.ajax({
          type: 'POST',
          url: $formurl,
          data: d,
          dataType: 'json',
          xhrFields: {withCredentials: !1},
          success: function(json) {
            console.log(json);
            var successurl = $jform.data('success-url'), successcallback = $jform.data('success-callback'),
              formsendedcallback = $jform.data('formsended-callback');
            if (btnformsubmit.removeClass('t-btn_sending'), btnformsubmit.data('form-sending-status',
              '0'), btnformsubmit.data('submitform', ''), json && json.error) {
              successurl = '', successcallback = '';
              var $errBox = $jform.find('.js-errorbox-all');
              $errBox && 0 != $errBox.length ||
              ($jform.prepend('<div class="js-errorbox-all"></div>'), $errBox = $jform.find('.js-errorbox-all'));
              var $allError = $errBox.find('.js-rule-error-all');
              $allError && 0 != $allError.length ||
              ($errBox.append('<p class="js-rule-error-all">' + json.error + '</p>'), $allError = $errBox.find(
                '.js-rule-error-all')), $allError.html(json.error).show(), $errBox.show(), $jform.addClass(
                'js-send-form-error'), $jform.trigger('tildaform:aftererror');
            } else {
              var formres = {};
              if (json && json.results && json.results[0]) {
                var str = json.results[0];
                str = str.split(':'), formres.tranid = str[0] + ':' + str[1], formres.orderid = str[2]
                  ? str[2]
                  : '0', '' < formres.orderid && '0' != formres.orderid &&
                (window.tildaForm.orderIdForStat = formres.orderid);
              } else formres.tranid = '0', formres.orderid = '0';
              $jform.data('tildaformresult', formres);
              var virtPage = $jform.data('tilda-event-name') || '';
              virtPage && '' != virtPage || (virtPage = 'y' == $jform.data('formcart') && json &&
              (json.next && json.next.type && 'function' != json.next.type || !json.next) ? '/tilda/' +
                $jform.attr('id') + '/payment/' : '/tilda/' + $jform.attr('id') + '/submitted/');
              var virtTitle = 'Send data from form ' + $jform.attr('id'), virtPrice = 0, virtProduct = '';
              if (window.Tilda && 'function' == typeof Tilda.sendEventToStatistics ? (window.tildaForm.tildapayment &&
              window.tildaForm.tildapayment.amount ? (virtPrice = window.tildaForm.tildapayment.amount, 0 <
              parseFloat(window.tildaForm.tildapayment.amount) && (virtTitle = 'Order ' + formres.orderid)) : 0 <
                $jform.find('.js-tilda-price').length &&
                (virtPrice = $jform.find('.js-tilda-price').val(), 0 < parseFloat(virtPrice) &&
                (virtTitle = 'Order ' + formres.orderid)), Tilda.sendEventToStatistics(virtPage, virtTitle, virtProduct,
                virtPrice)) : ('undefined' != typeof ga && ga && 'tilda' != window.mainTracker &&
              ga('send', {hitType: 'pageview', page: virtPage, title: virtTitle}), '' < window.mainMetrika &&
              window[window.mainMetrika] && window[window.mainMetrika].hit(virtPage,
                {title: virtTitle, referer: window.location.href})), window.dataLayer &&
              window.dataLayer.push({event: 'submit_' + $jform.attr('id')}), $jform.trigger(
                'tildaform:aftersuccess'), formsendedcallback && 0 < formsendedcallback.length &&
              eval(formsendedcallback + '($jform);'), json && json.next && '' < json.next.type) {
                var res = window.tildaForm.payment($jform, json.next);
                return successurl = '', !1;
              }
              window.tildaForm.successEnd($jform, successurl, successcallback);
            }
          },
          error: function(t) {
            var e = Date.now() - tsstartrequest;
            btnformsubmit.removeClass('t-btn_sending'), btnformsubmit.data('form-sending-status',
              '0'), btnformsubmit.data('submitform', '');
            var r = $jform.find('.js-errorbox-all');
            r && 0 != r.length ||
            ($jform.prepend('<div class="js-errorbox-all"></div>'), r = $jform.find('.js-errorbox-all'));
            var a = r.find('.js-rule-error-all');
            if (a && 0 != a.length ||
            (r.append('<p class="js-rule-error-all"></p>'), a = r.find('.js-rule-error-all')), !t || 0 == t.status &&
            e < 100) a.html('Request error (opening block content panel). Please check internet connection...'); else {
              if (t && (500 <= t.status || 408 == t.status || 410 == t.status || 429 == t.status || 'timeout' ==
                t.statusText) && -1 !== window.tildaForm.endpoint.indexOf(
                'forms.tilda')) return window.tildaForm.endpoint = 'forms2.tildacdn.com', window.tildaForm.send($jform,
                btnformsubmit, formtype, formskey), !1;
              t && '' < t.responseText ? a.html(t.responseText + '. Please, try again later.') : t && t.statusText
                ? a.html('Error [' + t.statusText + ']. Please, try again later.')
                : a.html('Unknown error. Please, try again later.');
            }
            a.show(), r.show(), $jform.addClass('js-send-form-error'), $jform.trigger('tildaform:aftererror');
          },
          timeout: 15e3
        }), !1;
      }
      if ('y' == $jform.data('is-formajax')) {
        var d = {};
        return d = $jform.serializeArray(), window.tildaForm.tildapayment && window.tildaForm.tildapayment.amount &&
        d.push({name: 'tildapayment', value: JSON.stringify(window.tildaForm.tildapayment)}), $.ajax({
          type: 'POST',
          url: $jform.attr('action'),
          data: d,
          dataType: 'text',
          xhrFields: {withCredentials: !1},
          success: function(t) {
            var e, r = $jform.data('success-url'), a = $jform.data('success-callback');
            if (btnformsubmit.removeClass('t-btn_sending'), btnformsubmit.data('form-sending-status',
              '0'), btnformsubmit.data('submitform', ''), t && 0 < t.length) if ('{' == t.substring(0, 1)) {
              if ((e = window.JSON && window.JSON.parse ? window.JSON.parse(t) : $.parseJSON(t)) && e.message) 'OK' !=
              e.message && $jform.find('.js-successbox').html(e.message); else if (e && e.error) {
                var o = $jform.find('.js-errorbox-all');
                o && 0 != o.length ||
                ($jform.prepend('<div class="js-errorbox-all"></div>'), o = $jform.find('.js-errorbox-all'));
                var i = o.find('.js-rule-error-all');
                return i && 0 != i.length ||
                (o.append('<p class="js-rule-error-all">Unknown error. Please, try again later.</p>'), i = o.find(
                  '.js-rule-error-all')), i.html(e.error), i.show(), o.show(), $jform.addClass(
                  'js-send-form-error'), $jform.trigger('tildaform:aftererror'), !1;
              }
            } else $jform.find('.js-successbox').html(t);
            var n = '/tilda/' + $jform.attr('id') + '/submitted/', s = 'Send data from form ' + $jform.attr('id');
            window.Tilda && 'function' == typeof Tilda.sendEventToStatistics ? window.Tilda.sendEventToStatistics(n, s,
              '', 0) : ('undefined' != typeof ga && 'tilda' != window.mainTracker &&
            ga('send', {hitType: 'pageview', page: n, title: s}), '' < window.mainMetrika &&
            window[window.mainMetrika] &&
            window[window.mainMetrika].hit(n, {title: s, referer: window.location.href})), $jform.trigger(
              'tildaform:aftersuccess'), window.tildaForm.successEnd($jform, r, a);
          },
          error: function(t) {
            btnformsubmit.removeClass('t-btn_sending'), btnformsubmit.data('form-sending-status',
              '0'), btnformsubmit.data('submitform', '');
            var e = $jform.find('.js-errorbox-all');
            e && 0 != e.length ||
            ($jform.prepend('<div class="js-errorbox-all"></div>'), e = $jform.find('.js-errorbox-all'));
            var r = e.find('.js-rule-error-all');
            r && 0 != r.length ||
            (e.append('<p class="js-rule-error-all"></p>'), r = e.find('.js-rule-error-all')), t && '' < t.responseText
              ? r.html(t.responseText + '. Please, try again later.')
              : t && t.statusText ? r.html('Error [' + t.statusText + ']. Please, try again later.') : r.html(
                'Unknown error. Please, try again later.'), r.show(), e.show(), $jform.addClass(
              'js-send-form-error'), $jform.trigger('tildaform:aftererror');
          },
          timeout: 15e3
        }), !1;
      }
      var attraction = $jform.attr('action');
      return -1 == attraction.indexOf(window.tildaForm.endpoint) &&
        (btnformsubmit.data('form-sending-status', '3'), $jform.submit(), !0);
    }, $('.js-tilda-captcha')
      .each(function() {
        if ('' < $(this).attr('data-tilda-captchakey')) {
          !1 === window.tildaForm.isRecaptchaScriptInit && (window.tildaForm.isRecaptchaScriptInit = !0, $('head')
            .append('<script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer><\/script>'), $(
            'head').append('<style type="text/css">.js-send-form-success .grecaptcha-badge {display: none;}</style>'));
          var t = $(this).attr('id');
          0 == $('#' + t + 'recaptcha').length && $(this)
            .append('<div id="' + t + 'recaptcha" class="g-recaptcha" data-sitekey="' +
              $(this).attr('data-tilda-captchakey') +
              '" data-callback="window.tildaForm.captchaCallback" data-size="invisible"></div>');
        } else $(this).removeClass('js-tilda-captcha');
      }), window.tildaForm_initMasks = function() {
      $('.js-tilda-mask')
        .each(function() {
          var t = $(this).data('tilda-mask'), e = $(this).data('tilda-mask-holder');
          t && !$(this).data('tilda-mask-init') &&
          (e && '' < e ? $(this).mask('' + t, {placeholder: '' + e}) : $(this).mask('' + t), $(this)
            .data('tilda-mask-init', '1'));
        });
    }, window.tildaForm_initMasks(), $('.r').off('focus', '.js-tilda-rule'), $('.r')
      .on('focus', '.js-tilda-rule', function() {
        var t = $(this).attr('placeholder');
        t && 0 < t.length && ($(this).data('placeholder', t), $(this).attr('placeholder', ''));
      }), $('.r').off('blur', '.js-tilda-rule'), $('.r')
      .on('blur', '.js-tilda-rule', function() {
        var t = $(this).data('placeholder');
        '' < t && ($(this).attr('placeholder', t), $(this).data('placeholder', ''));
      }), window.validateForm = function(t) {return window.tildaForm.validate(t);};
    var $jallforms = $('.r').find('.js-form-proccess[data-formactiontype]');
    0 < $jallforms.length && $jallforms.each(function() {
      1 != $(this).data('formactiontype') && $(this)
        .append(
          '<div style="position: absolute; left: -5000px; bottom:0;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments"  tabindex="-1" /></div>');
    }), $('.r')
      .find('.js-form-procces')
      .each(function() {
        try {2 == $(this).data('formactiontype') && $(this).attr('action', '#');} catch (t) {
          console.log(t);
        }
      }), $('.r').off('submit', '.js-form-proccess'), $('.r')
      .on('submit', '.js-form-proccess', function(t) {
        var e = $(this).find('[type=submit]'), r = e.data('form-sending-status');
        return r && 3 == r ? (e.data('form-sending-status', ''), !0) : ($(this)
          .find('[type=submit]')
          .hasClass('t706__submit_disable') || $(this).find('[type=submit]').trigger('click'), !1);
      }), $('.r').on('dblclick', '.js-form-proccess [type=submit]', function(t) {return t.preventDefault(), !1;}), $(
      '.r').off('click', '.js-form-proccess [type=submit]'), $('.r')
      .on('click', '.js-form-proccess [type=submit]', function(t) {
        t.preventDefault();
        var e = $(this);
        if ('1' <= e.data('form-sending-status')) return !1;
        if ($(this).hasClass('t706__submit_disable')) return !1;
        var r, a = $(this).closest('form');
        if (0 == a.length) return !1;
        if (e.addClass('t-btn_sending'), e.data('form-sending-status', '1'), e.data('submitform',
          a), window.tildaForm.hideErrors(a), r = window.tildaForm.validate(a), window.tildaForm.showErrors(a,
          r)) return e.removeClass('t-btn_sending'), e.data('form-sending-status', '0'), e.data('submitform', ''), !1;
        var o = a.data('formactiontype'), i = $('#allrecords').data('tilda-formskey');
        if (0 == a.find('.js-formaction-services').length && 1 != o && '' == i) {
          var n = a.find('.js-errorbox-all');
          n && 0 != n.length || (a.prepend('<div class="js-errorbox-all"></div>'), n = a.find('.js-errorbox-all'));
          var s = n.find('.js-rule-error-all');
          return s && 0 != s.length ||
          (n.append('<p class="js-rule-error-all">' + json.error + '</p>'), s = n.find('.js-rule-error-all')), s.html(
            'Please set receiver in block with forms').show(), n.show(), a.addClass(
            'js-send-form-error'), e.removeClass('t-btn_sending'), e.data('form-sending-status', '0'), e.data(
            'submitform', ''), a.trigger('tildaform:aftererror'), !1;
        }
        if (0 < a.find('.g-recaptcha').length && grecaptcha) {
          window.tildaForm.currentFormProccessing = {
            form: a,
            btn: e,
            formtype: o,
            formskey: i
          };
          var d = a.data('tilda-captcha-clientid');
          if (void 0 === d || '' === d) {
            var l = {
              size: 'invisible',
              sitekey: a.data('tilda-captchakey'),
              callback: window.tildaForm.captchaCallback
            };
            d = grecaptcha.render(a.attr('id') + 'recaptcha', l), a.data('tilda-captcha-clientid', d);
          } else grecaptcha.reset(d);
          return grecaptcha.execute(d), !1;
        }
        return window.tildaForm.send(a, e, o, i), !1;
      });
    try {
      var TILDAPAGE_URL = window.location.href, TILDAPAGE_QUERY = '', TILDAPAGE_UTM = '';
      if (-1 !== TILDAPAGE_URL.toLowerCase().indexOf('utm_') &&
        (TILDAPAGE_URL = TILDAPAGE_URL.toLowerCase(), TILDAPAGE_QUERY = TILDAPAGE_URL.split(
          '?'), TILDAPAGE_QUERY = TILDAPAGE_QUERY[1], 'string' == typeof TILDAPAGE_QUERY)) {
        var arPair, i, arParams = TILDAPAGE_QUERY.split('&');
        for (i in arParams) 'function' != typeof arParams[i] &&
        (arPair = arParams[i].split('='), 'utm_' == arPair[0].substring(0, 4) &&
        (TILDAPAGE_UTM = TILDAPAGE_UTM + arParams[i] + '|||'));
        if (0 < TILDAPAGE_UTM.length) {
          var date = new Date;
          date.setDate(date.getDate() + 30), document.cookie = 'TILDAUTM=' + encodeURIComponent(TILDAPAGE_UTM) +
            '; path=/; expires=' + date.toUTCString();
        }
      }
    } catch (t) {}
  });
}(jQuery);

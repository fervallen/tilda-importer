$(document).ready(() => {
  // Translations to Ukrainian
  $('div[field="li_title__1496239431201"]').html('Ваше ім\'я');
  $('.t706__orderform .t-input-group_pm .t-input-title').html('Спосіб оплати');
  $('.t706__cartwin-heading.t-name').html('Ваше замовлення');
  $('.t706__cartwin-prodamount-label').html('Усього: ');
  $('.t754__btn td').html('Купити');
  $('.t754__close-text').html('Більше товарів');
  $('.js-successbox.t-form__successbox').html('Дякуємо! Замовлення прийняте.');

  // Show and hide delivery address
  var deliveryTypeSelect = $('select[name="delivery.type"]');
  var addressInput = $('div[data-input-lid="1587382999752"]');
  changeAddressInputVisibility = function() {
    if (deliveryTypeSelect.val() === 'Адресна доставка') {
      addressInput.show();
    } else {
      addressInput.hide();
    }
  };
  changeAddressInputVisibility();
  deliveryTypeSelect.change(changeAddressInputVisibility);

  // Close 18+ popup
  $('.t658__btn').click(function() {
    console.log('CLICK');
    console.log($('#rec182675375'));
    $('#rec182675375').hide();
  });

  // Disable buying for items without price
  $('.t754__product-full').each(function(index, element) {
    if (!$(element).find('.t754__price-value').length) {
      $(element).find('.t754__col_right .t754__btn-wrapper').hide();
    }
  });
});

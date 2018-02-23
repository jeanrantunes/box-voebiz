var PurchaseBox = function() {
    var self = this;
    this.init = function() {
            $('.select-purchase-from').select2({
                placeholder: 'Digite a origem',
                language: "pt",
                data: [{id: 0, text: 'story'},{id: 1, text: 'bug'},{id: 2, text: 'task'}]
            }).on('select2:open', function(e){
                $('.select2-results').find('.btn-modal').remove();
                $('.select2-results').append('<a tabindex="-1" class="btn btn-sm btn-secondary btn-modal btn-block"><i class="icon golicons-airplane-marker"></i>VER TODOS OS DESTINOS</a>');
            }).on('select2:close', function(e){
                setTimeout(function(){
                    $('.select2-container-active').removeClass('select2-container-active');
                    $(':focus').blur(); 
                }, 1);
            });
            $('.select-purchase-to').select2({
                placeholder: 'Digite o destino',
                language: "pt"
            }).on('select2:open', function(e){
                $('.select2-results').find('.btn-modal').remove();
                $('.select2-results').append('<a tabindex="-1" class="btn btn-sm btn-secondary btn-modal btn-block"><i class="icon golicons-airplane-marker"></i>VER TODOS OS DESTINOS</a>');
            }).on('select2:close', function(e){
                setTimeout(function(){
                    $('.select2-container-active').removeClass('select2-container-active');
                    $(':focus').blur(); 
                }, 1);
            });
        self.addListeners();
    };

    this.addListeners = function() {
        $('#accordion').on('shown.bs.collapse', function(){
            $('#btn-close').show();
        }).on('hidden.bs.collapse', function(){
            $('#btn-close').hide();
        });

        $('#btn-close').on('click', function(){
            var self = this;
            $('.collapse').slideUp(function(){
                $(this).removeClass('show').removeAttr('style');
                $('.btn-nav-purchase').addClass('collapsed');
                $(self).hide().removeAttr('style');
            });
        });
        
        $('[name="makeCheckin"]').on('change', function(){
            var self = this;
            $('#tabPanelMakeCheckin').children().removeClass('show active');
            $('#tabPanelMakeCheckin').children('[aria-labelledby="'+$(self).attr('id').replace('#',"")+'"]').addClass('show active');
        });
    };

    return this.init();
};

var purchase = new PurchaseBox();
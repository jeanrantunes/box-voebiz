var PurchaseBox = function() {
    var self = this;
    this.init = function() {
            $('.select-purchase-from').select2({
                placeholder: 'Digite a origem',
                language: "pt",
                width: '100%',
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
                language: "pt",
                width: '100%'
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
        /*abrir box de comprar
            - Na primeira vez que aberto, abre com slideDown
            - A seguir como tabs do bs
        */
        $('.btn-nav-purchase').on('click', function() {
            $('.tab-content-main > .tab-pane').removeAttr('style');
            var id = $(this).attr('id') == "points-desk"? "points" : $(this).attr('id');
            if($('.tab-content-main > .tab-pane').hasClass('show')){
                $("#"+id).tab('show'); 
            }
            else{
                $('[aria-labelledby="'+id+'"]').slideDown(400, function(){
                    $('#'+id).tab('show');
                    $('#btn-close').show();
                });
            }    
        });

        $('.btn-nav-purchase').on('show.bs.tab', function (e) {
            var id = $(this).attr('id');
            var w = window.innerWidth;
            if((id == "status-flight" || id == "make-checkin") && w < 769)
                $('#mobileDropsPurchase').hide();
            else
                $('#mobileDropsPurchase').show();
        });

        $('#navMain').on('shown.bs.tab', function(){
            $('#btn-close').show();
        }).on('hidden.bs.tab', function(){
            $('#btn-close').hide();
        });

        $('#btn-close').on('click', function(){
            var self = this;
            $('.tab-content-main > .tab-pane').slideUp(function(){
                $('#mobileDropsPurchase').show();
                $(this).removeClass('active show').removeAttr('style');
                $('.btn-nav-purchase').removeClass('active show');
                $(self).hide().removeAttr('style');
            });
        });

        $('#date-go').datepicker({
            numberOfMonths: $(window).width() > 850 ? 2: 1,
            dateFormat: "dd/mm/yy",
            showOtherMonths: !0,
            selectOtherMonths: !0,
            minDate: new Date,
            maxDate: 330,
            beforeShow: function() {
                $(this).closest('.box-pb').addClass('input-focused');
            },
            onSelect: function(date) {
                updateBoxDate(moment(date, "DD-MM-YYYY"), $(this).closest('.box-pb'));
                $('#date-go').datepicker('option','minDate', date);
                $('#date-go').datepicker('option','defaultDate', date);
                $('#date-back').datepicker('option','defaultDate', date);
                /*atualiza o box da data de volta*/
                updateBoxDate(moment(date, "DD-MM-YYYY"), $('#date-back').closest('.box-pb'));
            },
            onClose: function() {
                $(this).closest('.box-pb').removeClass('input-focused');
            }
        }).val(moment(new Date).format("DD/MM/YYYY"));

        updateBoxDate(moment(new Date, "DD-MM-YYYY"), $('#date-go').closest('.box-pb'));

        $('#date-back').datepicker({
            numberOfMonths: $(window).width() > 850 ? 2: 1,
            dateFormat: "dd/mm/yy",
            showOtherMonths: !0,
            selectOtherMonths: !0,
            minDate: new Date,
            maxDate: 330,
            beforeShow: function() {
                $(this).closest('.box-pb').addClass('input-focused');
            },
            onSelect: function(date) {
                updateBoxDate(moment(date, "DD-MM-YYYY"), $(this).closest('.box-pb'));
                $("#date-back").datepicker("option", "defaultDate", self.date2);
                $("#date-back").datepicker("setDate", self.date2);
            },
            onClose: function() {
                $(this).closest('.box-pb').removeClass('input-focused');
            }
        }).val(moment(new Date).format("DD/MM/YYYY"));

        updateBoxDate(moment(new Date, "DD-MM-YYYY"), $('#date-back').closest('.box-pb'));
        /*atualiza o box de data*/
        function updateBoxDate(m,$this) {  
            $this.find('.number').text(m.format('DD'));
            $this.find('.month').text(m.format('MMMM'));
            $this.find('.year').text(m.format('YYYY'))
        };

        $('[name="purchase-type"]').on('change', function(){
            if($(this).attr('id') == "OneWay")
                $('.box-date-back').addClass('disabled');
            else
                $('.box-date-back').removeClass('disabled');
        });

        $('.box-number .numbers-addRemove a').on('click', function(){
            var value = parseInt($('.box-number').find('.number').text());
            if($(this).hasClass('numbers-add')) {
                if(value < 9) {
                    value ++;
                    $('#adults').val(value).attr('value',value);
                    $('.box-number').find('.number').text(value);
                }
            }
            else {
                if(value > 0) {
                    value --;
                    $('#adults').val(value).attr('value',value);
                    $('.box-number').find('.number').text(value);
                } 
            }
            return false;
        });

        $('[name="makeCheckin"]').on('change', function(){
            var self = this;
            $('#tabPanelMakeCheckin').children().removeClass('show active');
            $('#tabPanelMakeCheckin').children('[aria-labelledby="'+$(self).attr('id').replace('#',"")+'"]').addClass('show active');
        });

        $('[name="searchFlight"]').on('change', function(){
            var self = this;
            $('#tabPanelSearchFlight').children().removeClass('show active');
            $('#tabPanelSearchFlight').children('[aria-labelledby="'+$(self).attr('id').replace('#',"")+'"]').addClass('show active');
        });
    };

    return this.init();
};

var purchase = new PurchaseBox();
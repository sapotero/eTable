"use strict";

// модуль отвечающий за взаимодействие компонентов фреймворка

var nCore = nCore || {};
nCore.events = (function(){
  var activeCell;

  // функция которая валидно обрабатывает юникод
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }

  var init = function init (){
    
    ///////////////////////
    // Cобытия документа //
    ///////////////////////

    
    // новый документ
    nCore.document.root.subscribe('newDocument', function(data){
      
      // если документ новый - показываем модальное окошко с вводом имени
      if ( nCore.document.newDocument() ) {
        // console.log('new doc');
        // turn on (returns overlay element)
        var overlayEl = mui.overlay('on');

        // set overlay options
        var options = {
          'keyboard': true,  // teardown when <esc> key is pressed (default: true)
          'static'  : false, // maintain overlay when clicked (default: false)
          'onclose' : function() {
          }
        };
        // initialize with child element
        var m = document.createElement('div');
        m.style.width = '400px';
        m.style.height = '300px';
        m.style.margin = '10% auto';
        m.style.backgroundColor = '#fff';
        m.classList.toggle('mui-panel');
        m.classList.toggle('mui--z5');
        m.innerHTML = '<form onsubmit="nCore.document.root.publish(\'saveDocument\', this); return false;"><legend>Документ</legend><br><br><div class="mui-textfield mui-textfield--float-label"><input required name="nCoreDocumnetName"><label>Название</label></div><div class="mui-textfield mui-textfield--float-label"><input type=text required name="nCoreDocumnetDescription"><label>Описание</label></div><div class="mui--text-right"><button type=button onclick="mui.overlay(\'off\');" class="mui-btn mui-btn--raised mui-btn--danger">отмена</button><button type=submit class="mui-btn mui-btn--raised mui-btn--primary">сохранить</button></div></form>';

        mui.overlay('on', options, m);
      }
      // если не новый  - сохраняем
      else {
        // console.log('old doc');
        nCore.document.root.publish('saveDocument', nCore.document.id() )
      }
    });
    // сохранение документа
    nCore.document.root.subscribe('saveDocument', function(data){
      // если передеали значения из формы
      if ( data.nodeName === 'FORM' ) {
        nCore.document.setName(data.elements.nCoreDocumnetName.value);
        nCore.document.setDescription(data.elements.nCoreDocumnetDescription.value);
      };

      // если документ новый - показываем модальное окошко с вводом имени
      if ( nCore.document.newDocument() && data.nodeName !== 'FORM' ) {
        console.log('saveDocument', data);
        nCore.document.root.publish('newDocument', true);
        // тест
        // nCore.query.post( 'queries.json', {data: 'test'})
        // .success(function(data){
        //   console.log('post', data);
        // }).error(function(data){
        //   console.error('[!] post', post, data)
        // });

        // nCore.query.get( 'queries.json', {data: 'test'})
        // .success(function(data){
        //   console.log('get', data);
        // }).error(function(data){
        //   console.error('[!] post', post, data)
        // });
      }
      // если документ не новый - проверяем атрибуты
      else {
        
        if (document.getElementById('mui-overlay')) {
          mui.overlay('off');
        };

        // считаем табличку перед сохранением
        // $.FroalaEditor.COMMANDS.calculator.callback()
        var nCoreDocumentAttributes = {
          id          : nCore.document.id(),
          type        : 'report',
          name        : nCore.document.name(),
          description : nCore.document.description(),
          datetime    : new Date().getTime(),
          body        : b64EncodeUnicode(document.getElementById('paper').innerHTML),
          query       : nCore.document.cellQuery() || '',
          author      : 'AuthorName'
        };

        nCore.document.setAttributes( nCoreDocumentAttributes );

        nCore.query.post( 'documents.json', nCoreDocumentAttributes)
        .success(function(data){
          console.log('saveDocument', data);
        }).error(function(data){
          console.error('[!] saveDocument', post, data)
        });

      }
    });
    // изменение свойств документа
    nCore.document.root.subscribe('setDocumentAttributes', function(data){
      console.log('[main] setDocumentAttributes:', data);

      // обновляем название и шапку
      var headline = document.getElementById('nCoreDocumentHeadLine'),
          author   = document.getElementById('nCoreDocumentAuthor');

      headline.textContent = [data.type, data.name ].join(' ');
      author.textContent   = ' '+data.author;
      
      // всё ок, пришло подтвереие что можно скрывать оверлай и документ сохряненн (+делаем крутилку что идёт процесс сохранения), или выводим ошибку
      // if ( data === true ) {
      //   console.log('setDocumentAttributes true:', data);
      // } else {
      //   console.log('setDocumentAttributes false:', data);
      // }
    });

    // [NEW] изменение свойств документа
    nCore.document.root.subscribe('initEditor', function(data){
      console.log('initEditor');
      $('div#paper').froalaEditor({
        toolbarButtons: ['file-o', 'floppy-o', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontSize', '|', 'color', 'calculator','phone', /*'paragraphStyle'*/, '|', 'paragraphFormat', '|','alignLeft', 'alignCenter', 'alignRight', '|','formatOL', 'formatUL', '|','outdent', 'indent', '|','insertImage', 'insertTable', '|', 'html', '|','undo', 'redo', '|', 'cog'],
        language: 'ru',
        charCounterCount: false,
        toolbarSticky: false
        // раскоментировать когда будет выкладывать в прод
        // toolbarButtons: ['file-o', 'floppy-o', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontSize', '|', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', '|','alignLeft', 'alignCenter', 'alignRight', '|','formatOL', 'formatUL', '|','outdent', 'indent', '|','insertImage', 'insertTable', '|', 'html', '|','undo', 'redo', '|', 'cog'],
        // toolbarInline: true,
        // theme: 'gray',
        // tableEditButtons: ['tableRows', 'tableColumns', 'tableCells', 'tableCellVerticalAlign', 'tableRemove']
        // toolbarStickyOffset: 100,
        // toolbarBottom: true
      });
    });
    
    // изменение типа документа
    nCore.document.root.subscribe('setDocumentType', function(type){
      nCore.document.setType( type );
    });

    nCore.document.root.subscribe('go', function(url){
      location.hash = "#"+url;
    });

    nCore.document.root.subscribe('loadDocument',
      function( id, callback ){
        console.log('loadDocument', id);
        
        nCore.query.get( 'documents/'+id+'.json', {id: id} )
        .success(function(rawDocument){
          nCore.document.load(rawDocument);
          callback && typeof(callback) === 'function' ? callback.call(this, rawDocument) : false;
        }).error(function(data){
          console.error('[!] loadDocument -> get', data )
        });
      },
      
      // before callback
      function(data){
        // console.log( '** -> **', data );
      },

      // after callback
      function(data){
        // console.log( '** <- **', data );
      }
    );

    // создание нового документа
    nCore.document.root.subscribe('createNewDocument', function(type){
      var documentType = nCore.document.type() || type;
      console.log('setDocumentType', documentType);
      nCore.document.setType( documentType );

      var overlayEl = mui.overlay('on');

      // set overlay options
      var options = {
        'keyboard': true,  // teardown when <esc> key is pressed (default: true)
        'static'  : false, // maintain overlay when clicked (default: false)
        'onclose' : function() {
        }
      };
      // initialize with child element
      var m = document.createElement('div');
      m.style.width = '400px';
      m.style.height = '100px';
      m.style.margin = '10% auto';
      m.style.padding = '10% auto';
      m.style.backgroundColor = '#fff';
      m.classList.toggle('mui-panel');
      m.classList.toggle('mui--z5');
      m.innerHTML = '<h4>Создание нового документа</h4><div class="loader"></div>';

      mui.overlay('on', options, m);
      setTimeout( function(){ 
        mui.overlay('off');
        document.body.classList.add('hide-sidedrawer');
        location.hash = "#"+documentType+"/new"
      },1000);
    });

    nCore.document.root.subscribe('attachListMenu', function(type){
      // console.log('attachListMenu', type);
      nCore.menu.attach('.mui-panel.indexListView', '.menu');// new Menu().add();
    });


    /////////////////////
    // События рендера //
    /////////////////////
    
    // изменяем тип отображения
    nCore.document.root.subscribe('changeRenderType', function(type){
      nCore.storage.setItem('indexViewType', type);
      nCore.document.root.publish('renderIndexView', type);
    });

    nCore.document.root.subscribe('renderIndexView', function(type){
      // console.log('renderIndexView', data);

      // если не был выбран вариант отображения страницы
      if ( !nCore.storage.hasOwnProperty('indexViewType') ) {
        nCore.storage.setItem('indexViewType', 'thumb');
      };

      var items = JSON.parse( nCore.storage.getItem('documents') );
      // console.log('storage: ', items);
      
      var helper = {
        documentTitle: {
          text: function(params) {
            return this.name;
          }
        },
        documentDate: {
          text: function(params) {
            return this.date || new Date();
          }
        },
        documentId: {
          href: function(params) {
            return "#/table/" + this.id || Math.random();
          },
          text: function(){
            return ''
          }
        },
        documentUser: {
          text: function(){
            return this.user
          }
        }
      };

      Transparency.render(document.getElementById( nCore.storage.getItem('indexViewType') ), items, helper);

      
      var _mui_rows  = document.getElementsByClassName('mui-row _indexView'),
          _active_row = document.getElementsByClassName('_indexView '+nCore.storage.getItem('indexViewType') )[0];

      for (var i = 0; i < _mui_rows.length; i++) {
        _mui_rows[i].classList.add('mui--hide')
      };

      _active_row.classList.remove('mui--hide');
    });

    nCore.document.root.subscribe('renderNotPermit', function(data){
      // console.log('renderNotPermit', data);
      var data = {
        'textBad': 'Operation not permited'
      };

      Transparency.render(document.getElementById('content-wrapper'), data);
    });

    // проверяем что показывать
    nCore.document.root.subscribe('onRouteChange', function(data){

      console.log('onRouteChange', data);
    });

    /////////////////////////
    // Cобытия для таблицы //
    /////////////////////////
    
    // создание критериев поиска 
    nCore.modules.table.event.subscribe('generateQuery', function(data){
      // console.log('generateQuery', data);
      var table     = data.table,
          headClass = data.headClass,
          sideClass = data.sideClass;

      nCore.modules.table.tableQuery(table, headClass, sideClass);
    });

    // расчёт критериев поиска и отправление их на сервер
    nCore.modules.table.event.subscribe('calculateQuery', function(cellData){
      console.log('calculateQuery', cellData);
      nCore.document.setCellQuery(cellData);

      nCore.query.post( 'queries.json', {data: cellData})
        .success(function(data){
          console.log('calculateQuery -> post', data);

          nCore.modules.table.event.publish('insertCellData', data )
        }).error(function(data){
          console.error('[!] calculateQuery -> post', data)
        });
    });
    // вставка данных в таблицу
    nCore.modules.table.event.subscribe('insertCellData', function(data){
      // console.log('insertCellData', data);
      var table = document.querySelector('.fr-element.fr-view > table');

      for (var i = 0; i < data.length; i++) {
        table.rows[ data[i].rowIndex ].cells[ data[i].cellIndex ].textContent = data[i].value;
      };
    });
    // выбор активной ячейки
    nCore.modules.table.event.subscribe('cellSelect', function(cell){
      // console.log('cellSelect', cell);
      var showCellSettings = true,
          tab = document.getElementsByClassName('criteriaSelector')[0],
          cellQuery;

      activeCell = cell;
      tab.textContent = '';
      var __elements_to_update = [];

      if ( activeCell ) {
        // если есть query
        if (activeCell.dataset.hasOwnProperty('query') ) {
          var queryArray = JSON.parse(activeCell.dataset.query),
              _selectedIindex = -1;



          // console.log('*** queryArray', queryArray)
          for (var z = 0; z < queryArray.length; z++) {
          
            var group           = queryArray[z],
                groupConditions = group.conditions,
                criterias       = group.query;

            // console.log('criterias',  criterias);
            // console.log('conditions', groupConditions);

            var _groupTemplate       = document.getElementsByClassName('criteriaSelectorGroupTemplate')[0],
                groupTemplate        = _groupTemplate.cloneNode(true),
                groupSelectCondition = groupTemplate.getElementsByTagName('select')[0];

            if ( groupConditions ) {
              for (var v = 0; v < groupSelectCondition.options.length; v++) {
                if (groupSelectCondition[v].value === groupConditions) {
                  _selectedIindex = v;
                  break;
                };
              };

              groupTemplate.getElementsByClassName('connectionGroup')[0].classList.remove('mui--hide');
            };
            
            for (var b = 0; b < criterias.length; b++) {
              var _elements_to_update = [];
              var item  = criterias[b],
                  list  = groupTemplate.getElementsByClassName('criteriaSelectorGroupList')[0],
                  cardTemplate  = document.getElementsByClassName('criteriaSelectorItemTemplate')[0];

              // console.log('!! criteria', item);
              
              
              var card = cardTemplate.cloneNode(true);
              card.classList.remove('criteriaSelectorItemTemplate');
              card.classList.remove('mui--hide');

              var form = card.getElementsByClassName('criteriaForm')[0];

              var table_name  = form.querySelector('select[name="table_name"]'),
                  origin_name = form.querySelector('select[name="origin_name"]'),
                  conditions  = form.querySelector('select[name="conditions"]'),
                  value       = form.querySelector('[name="value"]');

              // на основании того какой спровачник был
              // выбран показываем те или иные значения
              var _df = new DocumentFragment();
              var criteriaKeys = JSON.parse(nCore.storage.criteriaKeys);
              for (var j = 0; j < criteriaKeys.length; j++) {
                var option = document.createElement('option');
                option.value = criteriaKeys[j].value;
                option.text  = criteriaKeys[j].name;
                _df.appendChild(option);
                if ( item.source === criteriaKeys[j].value ) {
                  _elements_to_update.push({name: 'table_name', val: item.source })
                };
              };
              table_name.appendChild(_df);
              
              // console.log('origin_table', item.source)
              _df = new DocumentFragment();
              var originTable = JSON.parse( nCore.storage.getItem( item.source ) );

              
              for (var q = 0; q < originTable.length; q++) {
                var option = document.createElement('option');
                option.value = originTable[q]._id;
                option.text  = originTable[q].russian_name;
                option.dataset.auto = originTable[q].autocomplete_url;
                originTable[q].autocomplete_url ? option.dataset.auto = originTable[q].autocomplete_url : false;
                if (item.origin_name === originTable[q]._id) {
                  _elements_to_update.push({name: 'origin_name', val: item.origin_name  })
                };
                _df.appendChild(option);
              };
              origin_name.appendChild(_df);
              
              _elements_to_update.push({name: 'conditions', val: item.conditions })
              
              var criteriaCondition = card.getElementsByClassName('criteriaSelectorItemCondition')[0].value = item.criteriaCondition;
              
              list.appendChild( card );

              for (var m = 0; m < _elements_to_update.length; m++) {
                var el   = _elements_to_update[m];
                el.element = card.querySelector('select[name="'+el.name+'"]');

                // console.log('* el', el.element);
              };
              // console.log('* card', card);

              var _tmp = card.querySelector('[name="value"]');
              _elements_to_update.push({ element: _tmp, val: item.value })
              
              __elements_to_update.push(_elements_to_update)
              nCore.modules.table.event.publish('newCellSettingsChange' );

              
            };

            var _group = groupTemplate,
                groupSelectCondition = _group.getElementsByTagName('select')[0].selectedIndex = _selectedIindex;

            _group.classList.remove('criteriaSelectorGroupTemplate');
            _group.classList.remove('mui--hide');

            // _total_elements_to_update.push(_elements_to_update);

            // _group.querySelector('[name="value"]').value = item.value;
            document.getElementsByClassName('firstTimeCriteria')[0].classList.add('mui--hide');
            tab.appendChild(_group);


          };
        } else {
          document.getElementsByClassName('firstTimeCriteria')[0].classList.remove('mui--hide');
        }
      };

      for (var k = 0; k < __elements_to_update.length; k++) {
        var _a = __elements_to_update[k];
        for (var o = 0; o < _a.length; o++) {
          
          // console.log('root ->', _a[o]);
          if ( !_a[o].element.dataset.hasOwnProperty('old') ) { _a[o].element.dataset.old = 1; };
          $(_a[o].element).val(_a[o].val).trigger('change');
          $(_a[o].element).trigger('change');
        };
      };
      // console.log('group_array', tab);
      // console.log('_elements_to_update', __elements_to_update);

      // показываем боковое меню по нажатию кнопки
      if ( showCellSettings && !document.getElementById('cellSettings').classList.contains('active') ) {
        document.getElementById('cellSettings').classList.toggle('active');
      };
    });

    // изменение критериев поиска активной ячейки
    nCore.modules.table.event.subscribe('newCellSettingsChange', function(NAME){

      var _query               = [],
          list                 = $(".criteriaSelector"),
          criterias            = list.children('div'),
          formulaSettings      = document.querySelector('.formulaSettings'),
          formulaSettingsItems = [].slice.call( formulaSettings.querySelectorAll('input') );
      // console.log('*** criterias: ', criterias);

      for (var i = 0; i < criterias.length; i++) {
        var criteria             = $(criterias[i]),
            criteriaItemsRoot    = criteria.children('.criteriaSelectorGroup'),
            criteriaItems        = criteriaItemsRoot.children('.criteriaSelectorGroupList').children('.criteriaSelectorItem');

        // console.log('newCellSettingsChange -> criteria['+i+']', criteria, criteriaItems );


        var data = {
          query      : [],
          conditions : criteria.children('.connectionGroup').children('select').val()
        };


        var criteriaItemQuery = {};

        for (var z = 0; z < criteriaItems.length; z++) {
          var item = $(criteriaItems[z]),
              head = item.children('.criteriaSelectorItemHeader'),
              form = item.children('.criteriaForm');

          data.query.push({
            criteria_condition : head.children('.criteriaSelectorItemOptions').children('.criteriaSelectorItemCondition')[0].value,
            source            : form.children('select[name="table_name"]').val(),
            conditions        : form.children('select[name="conditions"]').val(),
            origin_name       : form.children('select[name="origin_name"]').val(),
            value             : form.children('select[name="value"]').val() ? form.children('select[name="value"]').val() : form.children('input[name="value"]').val()
          });
        };

        _query.push( data );
      };
      // console.log('newCellSettingsChange -> data -> ', data)
      // console.log('before: ', activeCell)


      if (activeCell) {
        activeCell.dataset.query = JSON.stringify(_query);
        activeCell.dataset.name  = NAME
        
        console.log('---------');
        for (var v = 0; v < formulaSettingsItems.length; v++) {
          var checkbox = formulaSettingsItems[v];
          console.log('checkbox', checkbox.name, checkbox.checked);

          activeCell.dataset[checkbox.name]  = checkbox.checked;
        };
      };

      // console.log('newCellSettings | activeCell -> ',activeCell,  JSON.stringify(_query) )
    });




    ///////////////////
    // События юзера //
    ///////////////////
    // получаем права доступа юзера
    // nCore.user.event.subscribe('getUserPermissions', function(data){
      
    //   console.log('getUserPermissions');
    // });
    // // получаем список доков доступных юзеру
    // nCore.user.event.subscribe('getAvailableDocuments', function(data){
      
    //   console.log('getAvailableDocuments');
    // });

    ////////////////////////
    // События загрузчика //
    ////////////////////////
    
    
    // загружаем шаблоны
    nCore.preloader.event.subscribe('loadItem', function(items){
      console.log('loadItem', items);
      
      for (var z = 0; z < items.length; z++) {
        var item = items[z];

        // если шаблон - грузим их локально 
        if (item === 'templates') {

        }
        // или загружаем из приложульки
        else {
          nCore.query.get( item+'.json')
          .success(function(data){
            console.log('loadItem -> get', data);
            nCore.storage.setItem('documents', JSON.stringify(data) );
            nCore.document.root.publish( nCore.storage.getItem('indexViewType') );
          }).error(function(data){
            console.error('[!] loadItem -> get', data )
          });
        };
      };
    });

    nCore.preloader.event.subscribe('loadCriteria', function(data){
      // console.log('loadCriteria', data);
      
      // если уже есть загруженные справочники
      // то пока ничего не делаем
      // TODO: запилить синхронизацию
      if ( nCore.storage.hasOwnProperty('criteriaKeys') ) {
        return true;
      } else {
        nCore.query.get( 'sources.json')
        .success(function(data){
          console.warn('loadCriteria -> get', data);

          for (var i = 0; i < data.length; i++) {
            var source = data[i];
            nCore.storage.setItem(source.type, JSON.stringify(source.data) );
          };

          var keys = [];
          data.filter(function(v,i ) {
            console.log('filter', v,i);
            keys.push({
              value: v.type,
              name: v.name
            });
          });
          
          nCore.storage.setItem('criteriaKeys', JSON.stringify(keys) );
        }).error(function(data){
          console.error('[!] loadCriteria -> get', data )
        });
      };
    });
  };

  return {
    init  : init,
  };
})();
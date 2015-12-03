"use strict";

// роутер

var nCore = nCore || {};
nCore.router = (function(){

    var routes = {},
        decode = decodeURIComponent;
  
    function noop(s) {
      return s;
    }
  
    function sanitize(url) {
      ~url.indexOf('/?') && (url = url.replace('/?', '?'));
      url[0] == '/' && (url = url.slice(1));
      url[url.length - 1] == '/' && (url = url.slice(0, -1));
  
      return url;
    }
  
    function processUrl(url, esc) {
      var pieces = url.split('/'),
          rules  = routes,
          params = {};
  
      for (var i = 0; i < pieces.length && rules; ++i) {
        var piece = esc(pieces[i]);
        rules = rules[piece.toLowerCase()] || rules[':'];
        rules && rules['~'] && (params[rules['~']] = piece);
      }
  
      return rules && {
        cb: rules['@'],
        params: params
      };
    }
  
    function processQuery(url, ctx, esc) {
      if (url && ctx.cb) {
        var hash = url.indexOf('#'),
            query = (hash < 0 ? url : url.slice(0, hash)).split('&');
  
        for (var i = 0; i < query.length; ++i) {
          var nameValue = query[i].split('=');
  
          ctx.params[nameValue[0]] = esc(nameValue[1]);
        }
      }
  
      return ctx;
    }
  
    function lookup(url) {
      var querySplit = sanitize(url).split('?'),
          esc = ~url.indexOf('%') ? decode : noop;
  
      return processQuery( querySplit[1], processUrl( querySplit[0], esc ) || {}, esc );
    }
  
    return {
      add: function(route, handler) {
        var pieces = route.toLowerCase().split('/'),
            rules  = routes;
  
        for (var i = 0; i < pieces.length; ++i) {
          var piece = pieces[i],
              name = piece[0] == ':' ? ':' : piece;
  
          rules = rules[name] || (rules[name] = {});
  
          name == ':' && (rules['~'] = piece.slice(1));
        }
  
        rules['@'] = handler;
       },
      exists: function (url) {

        return !!lookup(url).cb;
       },
      lookup: lookup,
      run: function(url) {
        var result = lookup(url);
  
        result.cb && result.cb({
          url: url,
          params: result.params
        });
  
        return !!result.cb;
       }
    };
})();

/*
 * Роутинг
 */

jQuery(function($) {
  nCore.router.add('', function () {
    document.title = 'INDEX';
    nCore.templates.render('table/index', function(data){ 
      if ( data ) {
        var wrapper = document.getElementById('content-wrapper');
        wrapper.innerHTML = data;
      };

      // для теста!
      // создаём 12 элементов 
      var items = [];
      for (var i = 0; i < 120; i++) {
        items.push({
          documentId    : Math.random(),
          documentTitle : 'Title',
          documentDate  : Math.random()
        });
      };

      // рендерим превьюхи документа
      nCore.document.root.publish('renderSideMenuItem', items);
    });
  });

  nCore.router.add('test', function () {
    document.title = 'TEST:  ';
  });

  nCore.router.add('users/:name', function (r) {
    document.title = 'User ' + r.params.name;
  });

  nCore.router.add('tables', function (r) {
    // есть ли у юзера право просматривать таблицы
    if ( nCore.roles.check('viewTable') ) {
      nCore.templates.render('table/index', function(data){ 
        if ( data ) {
          var wrapper = document.getElementById('content-wrapper');
          wrapper.innerHTML = data;
        };

        // для теста!
        // создаём 12 элементов 
        var items = [];
        for (var i = 0; i < 120; i++) {
          items.push({
            documentId    : Math.random(),
            documentTitle : 'Title',
            documentDate  : Math.random()
          });
        };

        // рендерим превьюхи документа
        nCore.document.root.publish('renderSideMenuItem', items);
      });
    } else {
      nCore.templates.notPermit();
    }
  });
  
  nCore.router.add('tables/new', function (r) {
    document.title = 'tables new';

    nCore.templates.render('table/new', function(data){ 
      if ( data ) {
        var wrapper = document.getElementById('content-wrapper');
        wrapper.innerHTML = data;
        nCore.document.root.publish('initEditor');
      };
    });
  });

  nCore.router.add('tables/:name', function (r) {
    document.title = 'tables/:name '+ r.params.name;

    nCore.templates.render('table/table', function(data){ 
      if ( data ) {
        var wrapper = document.getElementById('content-wrapper');
        wrapper.innerHTML = data;
        nCore.document.root.publish('initEditor');
      };
    });
  });

  function processHash() {
    var hash = location.hash || '#';
    nCore.router.run(hash.slice(1));
  }

  window.addEventListener('hashchange', processHash);
  processHash();
});
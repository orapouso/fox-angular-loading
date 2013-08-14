/*global waits, runs, beforeEach, afterEach, describe, it, inject, expect, module, angular */

describe('angular-loading', function () {
  'use strict';

  beforeEach(module('angular-loading'));

  var scope, element, loading;

  function createLoading(options) {
    options = options || {};
    options.timeout = options.timeout ? 'timeout="' + options.timeout + '"' : '';

    inject(function ($rootScope, $compile) {
      scope = $rootScope;

      scope.untilExpr = false;
      element = angular.element(
        '<div>' +
        '<loading until="untilExpr == true" ' + options.timeout + '>' + (options.transclude || '') + '</loading>' +
        '</div>'
      );

      $compile(element)(scope);
      scope.$digest();
      loading = element.find('div');
    });
  }

  it('should inject new loading element with class="loading"', function () {
    createLoading();
    expect(loading.hasClass('loading')).toBe(true);
    expect(loading[0].style.display).toBe('');
  });

  it('should hide itself after expression becomes true', function () {
    createLoading();
    scope.untilExpr = true;
    scope.$digest();
    expect(loading[0].style.display).toBe('none');
    scope.untilExpr = false;
    scope.$digest();
    expect(loading[0].style.display).toBe('');
  });

  it('should hide itself after a designated timeout has passed, even if the expression is still false', inject(function ($timeout) {
    createLoading({timeout: 1});

    $timeout.flush();
    waits(1000);
    runs(function () {
      expect(loading[0].style.display).toBe('none');
      expect(scope.untilExpr).toBe(false);
    });
  }));

  it('should transclude any element inside it', function () {
    createLoading({transclude: '<div id="transclude"></div>'});

    expect(loading.find('div')[0].id).toBe('transclude');
  });
});

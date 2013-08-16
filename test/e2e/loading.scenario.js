/*global beforeEach, afterEach, describe, it, expect, browser, element, input */

describe('E2E: Loading directive', function () {

	beforeEach(function () {
		browser().navigateTo('/test/');
	});

	it('should inject new loading element with class="loading"', function () {
		expect(element('#outer .loading').count()).toBe(1);
	});

	it('should hide itself once the checkbox is checked', function () {
		input('checked').check();
		expect(element('#outer .loading').css('display')).toBe('none');
		input('checked').check();
		expect(element('#outer .loading').css('display')).not().toBe('none');
	});

	it('should hide itself after a certain timeout has passed', function () {
		expect(element('#timeout .loading').css('display')).toBe('none');
	});

	it('should transclude elements inside itself', function () {
		expect(element('#transclude .loading .other-loading').count()).toBe(1);
	});
});

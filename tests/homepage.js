var assert = require('chai').assert,
webdriver = require('selenium-webdriver'),
fs = require('fs');

var driver;

before(function(done) {
	driver = new webdriver
		.Builder()
		.withCapabilities({'browserName': 'firefox'})
		.build();

	driver.get('http://localhost:8000/').then(function() {
		console.log("open localhost:8000 ...");
		done();
	});

});

describe('Modal video', function () {
	it('should show', function(done) {
		driver.findElement(webdriver.By.css('img.video')).click();
		assert.ok(driver.findElement(webdriver.By.id('video')).isDisplayed());
		done();
	});
	it('should hide', function (done) {
		driver.findElement(webdriver.By.className('modal-backdrop')).click();
		assert.ok(driver.findElement(webdriver.By.id('video')).isDisplayed());
		done();
	});
});

describe('Check search link', function () {
	it('should be chef-a-domicile', function (done) {
		driver.findElement(webdriver.By.css('#browseChefs a')).getAttribute('href').then(function (href) {
			assert.equal(href, 'http://localhost:8000/chef-a-domicile');
			done();
		});
	});
	it('should be chef-a-domicile', function (done) {
		driver.findElement(webdriver.By.css('#third a')).getAttribute('href').then(function (href) {
			assert.equal(href, 'http://localhost:8000/chef-a-domicile');
			done();
		});
	});
});

describe('Check search for Paris', function() {
	it('should work', function (done) {
		driver.findElement(webdriver.By.id('city')).sendKeys('Paris');
		driver.findElement(webdriver.By.id('searchChefs')).click();

		driver.wait(function () {
			driver.getCurrentUrl().then(function (url){
				assert.equal(url, 'http://localhost:8000/chef-a-domicile/paris');
				done();
			});
		}, 1000);
	});
});

describe('Check search for Paris 30/08/2013 20:00', function() {
	before(function (done) {
		driver.get('http://localhost:8000/').then(function() {
			done();
		});
	});

	it('Autocomplete should work', function (done) {
		var city = driver.findElement(webdriver.By.id('city'));
		city.sendKeys('Paris');

		driver.wait(function () {
			driver.takeScreenshot().then(function (img) {
				fs.writeFileSync("homepage-googleautocomplete.png", new Buffer(img, 'base64'));
				driver.findElements(webdriver.By.css('.pac-container .pac-item')).then(function (els)  {
					els[0].click();

					city.getAttribute('value').then(function (value) {
						assert.strictEqual(value, "Paris, France");
						done();
					});
				});
			});
		}, 2000);
	});

	it('Kalendae should work', function (done) {
		var date = driver.findElement(webdriver.By.id('date'));
		date.click();
		driver.wait(function () {
			driver.findElements(webdriver.By.css('.kalendae .k-days .k-active')).then(function (els){
				els[0].click();

				driver.wait(function () {
					driver.takeScreenshot().then(function (img) {
						fs.writeFileSync("homepage-kalendae.png", new Buffer(img, 'base64'));

						date.getAttribute('value').then(function (value) {
							assert.notEqual(value, "");
							done();
						});
					});
				}, 500);
			});
		}, 500);
	});

	it('Dropkick should work', function (done) {
		var time = driver.findElement(webdriver.By.id('time'));
		var dktime = driver.findElement(webdriver.By.css('#dk_container_time .dk_toggle'));
		dktime.click();

		driver.wait(function () {
			driver.findElement(webdriver.By.css('#dk_container_time a[data-dk-dropdown-value="20:00"]')).click();
			driver.wait(function () {
				driver.takeScreenshot().then(function (img) {
					fs.writeFileSync("homepage-dropkick.png", new Buffer(img, 'base64'));

					time.getAttribute('value').then(function (value) {
						assert.strictEqual(value, "20:00");
						done();
					});
				});
			}, 500);
		}, 500);
	});

	it('should work', function (done) {
		driver.findElement(webdriver.By.id('searchChefs')).click();

		driver.wait(function () {
			driver.getCurrentUrl().then(function (url){
				assert.match(url, /\/chef-a-domicile\/paris,\%20france\/(\d){2}-(\d){2}-(\d){4}\/20:00/);
				done();
			});
		}, 1000);
	});
});

after(function(done) {
	driver.quit().then(done);
});

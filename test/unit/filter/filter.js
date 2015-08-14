var testRender = require('../../lib/test-render');

window.TESTIMG = window.__karma__ ? "/base/test/unit/filter/light_by_zenozeng.jpg" : "./unit/filter/light_by_zenozeng.jpg";

describe('Filters', function() {

    var tests = {
        // in SVG Renderer, I use feGaussianBlur,
        // but Canvas Renderer uses a pixels based blur (port of processing's blur),
        // so the results may not be exactly same.
        blur: function() {
            background(255);
            stroke(255, 0, 0);
            strokeWeight(10);
            line(0, 0, 100, 100);
            line(0, 100, 100, 0);
            filter(BLUR, 5);
            testRender.setMaxPixelDiff(2);
            testRender.setMaxDiff(1); // ignore diff, see known issue
        },
        gray: function() {
            background(200, 100, 50);
            filter(GRAY);
            testRender.setMaxPixelDiff(1);
        },
        invert: function() {
            background(255, 0, 0);
            filter(INVERT);
            ellipse(50, 50, 50, 50);
            testRender.setMaxPixelDiff(1);
        },
        threshold: function() {
            background(255, 0, 0);
            stroke(255);
            strokeWeight(10);
            line(0, 0, 100, 100);
            filter(THRESHOLD, 0.5);
        },
        opaque: function() {
            background(255, 0, 0, 127);
            filter(OPAQUE); // Sets the alpha channel to 255
        },
        posterize: function() {
            testRender.lock();
            loadImage(TESTIMG, function(img) {
                image(img, 0, 0);
                filter(POSTERIZE, 2);
                testRender.unlock();
            });
        },
        erode: function() {
            testRender.lock();
            loadImage(TESTIMG, function(img) {
                image(img, 0, 0);
                filter(ERODE);
                testRender.setMaxDiff(1); // ignore diff, see known issue
                testRender.unlock();
            });
        },
        dilate: function() {
            testRender.lock();
            loadImage(TESTIMG, function(img) {
                image(img, 0, 0);
                filter(DILATE);
                testRender.setMaxDiff(1); // ignore diff, see known issue
                testRender.unlock();
            });
        }
    };

    Object.keys(tests).forEach(function(key) {
        describe("Filters/" + key, function() {
            it(key + ': SVG API should draw same image as Canvas API', function(done) {
                testRender.describe("Filters/" + key);
                testRender(tests[key], done);
            });
        });
    });

});
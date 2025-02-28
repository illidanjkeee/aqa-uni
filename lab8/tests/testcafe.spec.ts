import { Selector } from 'testcafe';
fixture `UI Testing Example`
  .page `https://devexpress.github.io/testcafe/example/`;

test('Submit Form with Valid Data', async t => {
  await t
    .typeText('#developer-name', 'John Doe')
    .click('#submit-button')
    .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Check Checkboxes and Radio Buttons', async t => {
  await t
    .click('#remote-testing')
    .click('#reusing-js-code')
    .click('#background-parallel-testing')
    .click('#tried-test-cafe')
    .expect(Selector('#remote-testing').checked).ok()
    .expect(Selector('#reusing-js-code').checked).ok()
    .expect(Selector('#background-parallel-testing').checked).ok()
    .expect(Selector('#tried-test-cafe').checked).ok();
});

test('Slider Functionality', async t => {
  await t
    .typeText('#developer-name', 'Jane Smith')
    .click('#tried-test-cafe')
    .drag('.ui-slider-handle', 270, 0, { offsetX: 10, offsetY: 10 })
    .expect(Selector('.slider-value').innerText).eql('1');
});
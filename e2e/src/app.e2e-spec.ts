import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display h1 tag', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeTruthy();
  });
});

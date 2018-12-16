import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { KeywordSearchService } from './keyword-search.service';

describe('KeywordSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [KeywordSearchService]
    });
  });

  it('should be created', inject([KeywordSearchService], (service: KeywordSearchService) => {
    expect(service).toBeTruthy();
  }));
});

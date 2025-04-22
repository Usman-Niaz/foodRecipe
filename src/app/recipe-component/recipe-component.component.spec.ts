import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeComponentComponent } from './recipe-component.component';

describe('RecipeComponentComponent', () => {
  let component: RecipeComponentComponent;
  let fixture: ComponentFixture<RecipeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

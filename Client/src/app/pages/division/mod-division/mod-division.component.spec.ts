import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDivisionComponent } from './mod-division.component';

describe('ModDivisionComponent', () => {
  let component: ModDivisionComponent;
  let fixture: ComponentFixture<ModDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModDivisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

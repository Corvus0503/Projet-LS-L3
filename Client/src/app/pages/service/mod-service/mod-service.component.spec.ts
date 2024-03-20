import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModServiceComponent } from './mod-service.component';

describe('ModServiceComponent', () => {
  let component: ModServiceComponent;
  let fixture: ComponentFixture<ModServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

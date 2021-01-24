import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from 'src/providers/services/app.service';
import { AppComponent } from './app.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appService: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AppService
      ],
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided to the TestBed
    appService = TestBed.get(AppService);

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cocktail'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cocktail');
  });

  it('should have at least one category', () => {
    fakeAsync(() => {
      let response = {
        "drinks":[
           {
              "strCategory":"Ordinary Drink"
           },
           {
              "strCategory":"Cocktail"
           },
           {
              "strCategory":"Milk \/ Float \/ Shake"
           },
           {
              "strCategory":"Other\/Unknown"
           },
           {
              "strCategory":"Cocoa"
           },
           {
              "strCategory":"Shot"
           },
           {
              "strCategory":"Coffee \/ Tea"
           },
           {
              "strCategory":"Homemade Liqueur"
           },
           {
              "strCategory":"Punch \/ Party Drink"
           },
           {
              "strCategory":"Beer"
           },
           {
              "strCategory":"Soft Drink \/ Soda"
           }
        ]
     };

      // Perform a request (this is fakeAsync to the responce won't be called until tick() is called)
      appService.fetchCategoriesOrIngredients("c");

      // Expect a call to this URL
      const req = httpTestingController.expectOne(
          "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
      );
      // Assert that the request is a GET.
      expect(req.request.method).toEqual("GET");
      // Respond with this data when called
      req.flush(response);

      // Call tick which actually processes te response
      tick();

      // Run our tests
      expect(component.categoriesArray[0].strCategory).toBe("Ordinary Drink");
    });
  })
});

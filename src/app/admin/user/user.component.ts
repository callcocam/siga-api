import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedServicesService } from "../../services/shared-services.service";
import { ResourcesService } from "../../services/resources.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from "../../components/flash-messages/flash-messages.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { Result } from "../../services/result";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  public user = new User();
  public selectedId = 1;
  public fileName = "";
  public AppForm: FormGroup;
  constructor(
    public sharedService: SharedServicesService,
    public resources: ResourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public _flashMessagesService: FlashMessagesService,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.resources.path = "user";
    this.AppForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      empresa: this.formBuilder.control(""),
      cover: this.formBuilder.control(""),
      first_name: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      last_name: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: this.formBuilder.control("", [Validators.required]),
      // phone: this.formBuilder.control("", [Validators.required]),
      facebook: this.formBuilder.control("", []),
      google: this.formBuilder.control("", []),
      twitter: this.formBuilder.control("", []),
      // street: this.formBuilder.control("", [Validators.required]),
      // number: this.formBuilder.control("", [Validators.required]),
      // district: this.formBuilder.control("", [Validators.required]),
      // city: this.formBuilder.control("", [Validators.required]),
      // state: this.formBuilder.control("", [Validators.required]),
      //country: this.formBuilder.control("", [Validators.required]),
      password: this.formBuilder.control("", []),
      created_at: this.formBuilder.control("", []),
      updated_at: this.formBuilder.control("", []),
      description: this.formBuilder.control("", [Validators.required]),
      status: this.formBuilder.control("", [])
    });
    this.getItem();
  }

  getItem() {
    let params = this.localStorage.getObject(this.localStorage.USER_KEY).id;
    if (params) {
      this.resources.getItem(+params).subscribe(data => {
        this.user = data;
        this.AppForm.controls["id"].patchValue(this.user.id);
        this.AppForm.controls["cover"].patchValue(this.user.cover);
        this.AppForm.controls["empresa"].patchValue(this.user.empresa);
        this.AppForm.controls["first_name"].patchValue(this.user.first_name);
        this.AppForm.controls["last_name"].patchValue(this.user.last_name);
        this.AppForm.controls["email"].patchValue(this.user.email);
        // this.AppForm.controls["phone"].patchValue(this.user.phone);
        this.AppForm.controls["facebook"].patchValue(this.user.facebook);
        this.AppForm.controls["google"].patchValue(this.user.google);
        this.AppForm.controls["twitter"].patchValue(this.user.twitter);
        // this.AppForm.controls["street"].patchValue(this.user.street);
        // this.AppForm.controls["number"].patchValue(this.user.number);
        // this.AppForm.controls["district"].patchValue(this.user.district);
        // this.AppForm.controls["city"].patchValue(this.user.city);
        // this.AppForm.controls["state"].patchValue(this.user.state);
        // this.AppForm.controls["number"].patchValue(this.user.number);
        // this.AppForm.controls["country"].patchValue(this.user.country);
        this.AppForm.controls["created_at"].patchValue(this.user.created_at);
        this.AppForm.controls["updated_at"].patchValue(this.user.updated_at);
        this.AppForm.controls["description"].patchValue(this.user.description);
        if (this.user.status == 1) {
          this.sharedService.selected = this.sharedService.defaultBindingsStatus[0];
        }
        if (this.user.status == 2) {
          this.sharedService.selected = this.sharedService.defaultBindingsStatus[1];
        }
        if (this.user.status == 3) {
          this.sharedService.selected = this.sharedService.defaultBindingsStatus[2];
        }
        this.fileName = this.sharedService.getSrcUrl(this.user.cover);
      });
    } else {
      this.router.navigate["/admin/dashboard"];
    }
  }

  save(data) {
    this.resources.path = "user";
    this.resources.update(data, { id: this.user.id }).subscribe(
      response => {
        let result = new Result();
        Object.assign(result, response);
        this._flashMessagesService.show(result.msg, {
          cssClass: `alert-${result.type}`,
          timeout: 5000
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  upload($event) {
    this.AppForm.controls["cover"].patchValue(JSON.parse($event).location);
    this.fileName = this.sharedService.getSrcUrl(JSON.parse($event).location);
  }
}

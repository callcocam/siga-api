import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedServicesService } from "../../services/shared-services.service";
import { ResourcesService } from "../../services/resources.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from "../../components/flash-messages/flash-messages.service";
import { Empresa } from "./Empresa";
import { LocalStorageService } from "../../services/local-storage.service";
import { Result } from "../../services/result";
import * as Switchery from "Switchery";
@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.css"]
})
export class EmpresaComponent implements OnInit {
  public empresa = new Empresa();
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
  ) {
    
    // var elem = document.querySelector(".js-switch");
    // var init = new Switchery(elem,{ color: '#41b7f1','type':'checkbox' });
  }
  ngOnInit() {
    this.resources.path = "empresa";
    this.AppForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      empresa: this.formBuilder.control(""),
      cover: this.formBuilder.control(""),
      fantasia: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      social: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      tipo: this.formBuilder.control("", [Validators.required]),
      cnpj: this.formBuilder.control("", [Validators.required]),
      ie: this.formBuilder.control("", [Validators.required]),
      email: this.formBuilder.control("", [Validators.required]),
      phone: this.formBuilder.control("", [Validators.required]),
      facebook: this.formBuilder.control("", []),
      google: this.formBuilder.control("", []),
      twitter: this.formBuilder.control("", []),
      street: this.formBuilder.control("", [Validators.required]),
      number: this.formBuilder.control("", [Validators.required]),
      district: this.formBuilder.control("", [Validators.required]),
      city: this.formBuilder.control("", [Validators.required]),
      state: this.formBuilder.control("", [Validators.required]),
      country: this.formBuilder.control("", [Validators.required]),
      longetude: this.formBuilder.control("", [Validators.required]),
      latitude: this.formBuilder.control("", [Validators.required]),
      created_at: this.formBuilder.control("", []),
      updated_at: this.formBuilder.control("", []),
      description: this.formBuilder.control("", [Validators.required]),
      status: this.formBuilder.control("", [])
    });
    this.getItem();
  }

  getItem() {
    let params = this.localStorage.getObject(this.localStorage.USER_KEY)
      .empresa;
    if (params) {
      this.resources.getItem(+params).subscribe(data => {
        this.empresa = data;
        this.AppForm.controls["id"].patchValue(this.empresa.id);
        this.AppForm.controls["cover"].patchValue(this.empresa.cover);
        this.AppForm.controls["empresa"].patchValue(this.empresa.empresa);
        this.AppForm.controls["fantasia"].patchValue(this.empresa.fantasia);
        this.AppForm.controls["tipo"].patchValue(this.empresa.tipo);
        this.AppForm.controls["social"].patchValue(this.empresa.social);
        this.AppForm.controls["cnpj"].patchValue(this.empresa.cnpj);
        this.AppForm.controls["ie"].patchValue(this.empresa.ie);
        this.AppForm.controls["email"].patchValue(this.empresa.email);
        this.AppForm.controls["phone"].patchValue(this.empresa.phone);
        this.AppForm.controls["facebook"].patchValue(this.empresa.facebook);
        this.AppForm.controls["google"].patchValue(this.empresa.google);
        this.AppForm.controls["twitter"].patchValue(this.empresa.twitter);
        this.AppForm.controls["street"].patchValue(this.empresa.street);
        this.AppForm.controls["number"].patchValue(this.empresa.number);
        this.AppForm.controls["district"].patchValue(this.empresa.district);
        this.AppForm.controls["city"].patchValue(this.empresa.city);
        this.AppForm.controls["state"].patchValue(this.empresa.state);
        this.AppForm.controls["number"].patchValue(this.empresa.number);
        this.AppForm.controls["country"].patchValue(this.empresa.country);
        this.AppForm.controls["longetude"].patchValue(this.empresa.longetude);
        this.AppForm.controls["latitude"].patchValue(this.empresa.latitude);
        this.AppForm.controls["created_at"].patchValue(this.empresa.created_at);
        this.AppForm.controls["updated_at"].patchValue(this.empresa.updated_at);
        this.AppForm.controls["description"].patchValue(
          this.empresa.description
        );
        if (this.empresa.status == 1) {
          this.sharedService.selected = this.sharedService.defaultBindingsStatus[0];
        }
        if (this.empresa.status == 2) {
          this.sharedService.selected = this.sharedService.defaultBindingsStatus[1];
        }
        if (this.empresa.status == 3) {
          this.sharedService.selected = this.sharedService.defaultBindingsStatus[2];
        }
        this.fileName = this.sharedService.getSrcUrl(this.empresa.cover);
      });
    } else {
      this.router.navigate["/admin/dashboard"];
    }
  }

  save(data) {
    this.resources.path = "empresa";
    this.resources.update(data, { id: this.empresa.id }).subscribe(
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

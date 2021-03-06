import {ControlValueAccessor} from '@angular/forms';

export class AbstractControleValueAccessor implements ControlValueAccessor {

  val: any;

  onChange: any = val => {};

  onTouched: any = val => {};

  writeValue(value: any) {
    this.val = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  set value(value: any) {
    this.val = value;
    this.onChange(this.val);
    this.onTouched(this.val);
  }

  get value() {
    return this.val;
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  croppedImgUrl = "";
  loading = false;
  pickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 55,
  };
  cropOpt: CropOptions = {
    quality: 55
  }

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private file: File
  ) { }

  ngOnInit() { }

  goBack() {
    this.modalCtrl.dismiss()
    this.navCtrl.back()
  }

  selectImage() {
    this.imagePicker.getPictures(this.pickerOptions).then((results) => {
      console.log('111111---results', results)
      for (var i = 0; i < results.length; i++) {
        console.log('22222---results[i]', results[i])
        this.imageCropMethod(results[i]);
      }
    }, (error) => {
      alert(error);
    });
  }
  imageCropMethod(pathImage: any) {
    console.log('33333---pathImage', pathImage)

    this.crop.crop(pathImage, this.cropOpt)
      .then(
        newPath => {
          this.croppedImg(newPath.split('?')[0])
          console.log('44444')

        },
        error => {
          alert('Error in cropper' + error);
        }
      );
  }
  croppedImg(pathImage: any) {
    console.log('55555---pathImage', pathImage)
    this.loading = true;
    var copyUrl = pathImage;
    var splitPath = copyUrl.split('/');
    var imgName = splitPath[splitPath.length - 1];
    var fileUrl = pathImage.split(imgName)[0];
    console.log('66666---fileUrl', fileUrl, '---imgName', imgName)

    this.file.readAsDataURL(fileUrl, imgName).then(base64 => {
      console.log('77777---base64', base64)

      this.croppedImgUrl = base64;
      console.log('888888')

      this.loading = false;
    }, error => {
      alert(error);
      this.loading = false;
    });
  }
}

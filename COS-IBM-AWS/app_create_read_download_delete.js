/*
CLOUD OBJECT STORAGE "COS"
FROM IBM example of usage.
*/


var AWS = require('ibm-cos-sdk');
var fs = require('fs');
let cos = new AWS.S3( {
    endpoint: 's3.us-south.cloud-object-storage.appdomain.cloud',
    apiKeyId: '<api key>',
    serviceInstanceId: '<resource_instance_id>',
  } );


///UPLOAD OBJECT TO BUCKET  
let obj = fs.readFileSync("c:/your/path/example.jpg");

cos.putObject( {
  Body: obj,
  Bucket: 'cos-alex',///name of your bucket
  Key: "example1.jpg" //name to save in cos    
} )
.promise()
.then( ( data ) => {
  console.log( 'File storage complete.\n'+data);
} );


///DONWLOAD FILE TO SERVER  ///PART COMMENT IS FOR PASS PARAM TO FRONT
cos.getObject( {
    Bucket: 'cos-alex',///name of your bucket
    Key: "sekiro_genichiro.jpg" //name of the file on the COS
  } )
  .promise()
  .then( ( data ) => {
    fs.writeFileSync(__dirname + `/sekiro.jpg`, data.Body); //path where you want to save it
/*     return {
      headers: { 
        'Content-Disposition': `attachment; filename="sekiro.jpg"`,
        'Content-Type': data.ContentType 
      },
      statusCode: 200,
      body: Buffer.from( data.Body ).toString( 'base64' )
    };  */
  } );



  ////not working error of S3 or Version4 only work for AWS
/* var url_get="";
  ////url download files
cos.getSignedUrl('getObject', {
    Bucket: 'cos-alex',
    Key: "sekiro_genichiro.jpg"
  }, function (err, url) {
      console.log(err);
      url_get=url;
  });


  console.log(url_get); */
////Read object(files) in COS
cos.listObjectsV2( {
    Bucket: 'cos-alex'
  } )
  .promise()
  .then( ( data ) => {
    let body = [];
  
    for( let c = 0; c < data.Contents.length; c++ ) {
      body.push( {
        name: data.Contents[c].Key,
        etag: data.Contents[c].ETag.replace( /"/g,"" ),
        modified: data.Contents[c].LastModified,
        size: data.Contents[c].Size
      } );
    }
    console.log(body); 
    
    /* //////////////////Response 
    [
  {
    name: 'example1.jpg',
    etag: 'de50a0354e28ee5a35d5231f82154948',
    modified: 2020-05-07T22:03:51.935Z,
    size: 11382
  },
  {
    name: 'example2.jpg',
    etag: 'de50a0354e28ee5a35d5231f82154948',
    modified: 2020-05-07T22:03:51.935Z,
    size: 11382
  }
 ] */
 
  } );
///Delete objects
  cos.deleteObject( {
    Bucket: 'cos-alex',
    Key: "favor2.jpg"
  } )
  .promise()
  .then( ( data ) => {
      console.log(data);//response   {}
  } );

const fs = require('fs');
const header = 'static const unsigned char';
const suffix = 'PROGMEM';
const output = './header.h';

var i = 1;
var reading = 0;
var writestream = fs.createWriteStream(output, {flags:'a'});


function processNextFile(){
  i++;
  if(i!=process.argv.length){
    console.log();
    convertfile(process.argv[i]);
  }else{
    writestream.end();
  }
}

function convertfile(fname){
  var varname = fname.replace(".","_");
  var content = `${header} ${varname}[] ${suffix}= {`;
  writestream.write(content);

  var readstream = fs.createReadStream(fname);
  readstream.setEncoding('hex');

  readstream.on('data', (chunk) => {
    //console.log(`Received ${chunk.length} bytes of data.`);
    var hbytes = chunk.match(/(.{1,2})/g);
    for(var ii = 0;ii<hbytes.length;ii++){
      //console.log(`0x${hbytes[ii]},`);
      if(ii == 0 && reading==1){
        writestream.write(',');
      }
      if(ii==(hbytes.length-1)){
        writestream.write(`0x${hbytes[ii]}`);
      }else{
        writestream.write(`0x${hbytes[ii]},`);
      }
    }
    reading = 1;
  });

  readstream.on('end', () => {
    reading = 0;
    writestream.write('};\n ');
    processNextFile();
  });
};

processNextFile();

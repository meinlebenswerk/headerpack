#headerpack

This utility takes in a file and converts it into a includeable .h file, so you can put any file into your ESP8266/32 for displaying it on the web ect... (It originally was written in order to put the invaders ROMs into PROGMEM :) for an emulator test.)

##syntax::
The syntax is pretty easy:
node headerpack.js <filename1 filename2 ...>
All the files will be put into one .h file (header.h);
The variables themselves are put saved as "static const unsigned char xyz[] PROGMEM", but you are free to hack that ;)
Where xyz is the filename, ('.'s are replaced by underscores);

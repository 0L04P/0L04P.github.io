//var fileHandle;		
// fileHandle is an instance of FileSystemFileHandle..
async function pScriviFile(contents) {
	const [fileHandle] = await window.showOpenFilePicker();
	// Create a FileSystemWritableFileStream to write to.
	const writable = await fileHandle.createWritable();
	// Write the contents of the file to the stream.
	await writable.write(contents);
	// Close the file and write the contents to disk.
	await writable.close();
}


async function pCreaFile(estensione = '') {
   if(estensione == ''){estensione = 'txt'}
    const options = {
        types: [{
            description: 'Text Files',
            accept: { 'text/plain': ['.' + estensione] },
        }],
    };
  
    try {
        const fileHandle = await window.showSaveFilePicker(options);
        const writableStream = await fileHandle.createWritable();
        
        await writableStream.write("---File creato da PWA---");
        await writableStream.close();
    } catch (error) {
        console.error("File save failed:", error);
    }
}


async function pLeggiFile(estensione = '', callbackFn = '') {
    if(estensione == ''){estensione = 'txt'}
    try {
        // Opens a file picker for text files
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'Text Files',
                accept: { 'text/plain': ['.' + estensione] },
            }],
        });

        // Get a File object from the file handle
        const file = await fileHandle.getFile();
        
        // Read the file as text
        const content = await file.text();
        
		localStorage['olo_Traduzioni'] = [];
		localStorage['olo_Traduzioni'] = content;
		console.log("File content:" + content);	
	    if(callbackFn != ''){ callbackFn(); }
		
        // You can process the content here
    } catch (error) {
       alert("Error reading file:"  + error);
    }
}


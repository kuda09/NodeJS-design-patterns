let endStreamResponse = () => process.stdout.write('End of stream');
let processStream = () => {

    let chunk;
    console.log('New data avalaible');
    while((chunk = process.stdin.read()) !== null) {

        console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
    }
};

process.stdin
.on('readable', processStream)
.on('end', endStreamResponse);
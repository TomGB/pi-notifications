const shutdown = callback => {
    exec('sudo shutdown now', (err, stdout, stderr) => {
        if (err) console.log(err);

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}
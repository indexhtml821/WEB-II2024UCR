const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const hostname = '0.0.0.0';
const port = 0;

const visitasFile = 'visitas.txt';
fs.open(visitasFile, 'a', (err) => {
    if (err) throw err;
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        // Mostrar el formulario HTML
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error al cargar la página');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });

    } else if (req.method === 'POST' && parsedUrl.pathname === '/agregar') {
        // Recibir los datos del formulario
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const nombre = parsedBody.nombre;
            const email = parsedBody.email;
            const comentario = parsedBody.comentario;

            if (nombre && email && comentario) {
                const mensaje = `Nombre: ${nombre}\nCorreo: ${email}\nComentario: ${comentario}\n\n`;
                // Guardar el mensaje en visitas.txt
                fs.appendFile(visitasFile, mensaje, (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Error al guardar el mensaje');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.end('<h1>Mensaje agregado correctamente</h1><br><a href="/">Volver</a><br><a href="/listarVisitas">Listar visitas</a>');
                    }
                });
            } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Datos incompletos');
            }
        });

    } else if (req.method === 'GET' && parsedUrl.pathname === '/listarVisitas') {
        // Listar los mensajes guardados en visitas.txt
        fs.readFile(visitasFile, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error al cargar los mensajes');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                // Convert the file content to HTML
                const entries = data.toString().split('\n\n');
                let htmlContent = '<html><body>';
                htmlContent += '<br><a href="/">Añadir otra visita</a><br><br>';
                entries.forEach(entry => {
                    if (entry.trim()) {
                        const lines = entry.split('\n');
                        htmlContent += '<div>';
                        lines.forEach(line => {
                            htmlContent += `<p>${line}</p>`;
                        });
                        htmlContent += '</div><hr>';
                    }
                });
                htmlContent += '</body></html>';

                res.end(htmlContent);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Página no encontrada');
    }
});

server.listen(port, hostname, () => {
  
    console.log(`Server running at http://${hostname}:${server.address().port}/`);
});

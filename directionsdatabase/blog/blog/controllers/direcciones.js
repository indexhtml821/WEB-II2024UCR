const Direcciones = require('../models').Direcciones;

class DireccionesController {

    
        // Método para mostrar todas las direcciones
        async index(req, res) {
            try {
                // Obtiene todas las direcciones desde la base de datos
                const direcciones = await Direcciones.findAll();
                
                // Renderiza una vista o envía datos en formato JSON
                res.render('direcciones/index', { 
                    title: 'Lista de Direcciones', // Título de la página
                    direcciones // Pasar las direcciones a la vista
                });
            } catch (error) {
                console.error("Error al obtener las direcciones:", error);
                res.status(500).send("Error al cargar las direcciones");
            }
        }
        
        // Aquí puedes agregar métodos para editar y eliminar direcciones
        async delete(req, res) {
          try {
            const { id } = req.params;
            await Direcciones.destroy({ where: { id } });
            res.redirect('/direcciones');
          } catch (error) {
            console.error("Error al eliminar la dirección:", error);
            res.status(500).send("Error al eliminar la dirección");
          }
        }
        
        // Método para mostrar el formulario de edición de dirección
        async edit(req, res) {
            try {
                const { id } = req.params;
                // Encuentra la dirección por su ID
                const direccion = await Direcciones.findByPk(id);
                // Renderiza el formulario de edición con los datos de la dirección
                res.render('direcciones/edit', { title: 'Editar Dirección', direccion });
            } catch (error) {
                console.error("Error al cargar el formulario de edición:", error);
                res.status(500).send("Error al cargar el formulario de edición");
            }
        }

        async update(req, res) {
            try {
                const { id } = req.params;
                // Extrae los datos de la dirección desde el cuerpo de la solicitud
                const { Nombre, Apellidos, TelefonoCasa, DireccionCasa, TelefonoTrabajo, DireccionTrabajo, CorreoElectronico } = req.body;
    
                // Actualiza la dirección en la base de datos
                await Direcciones.update(
                    { Nombre, Apellidos, TelefonoCasa, DireccionCasa, TelefonoTrabajo, DireccionTrabajo, CorreoElectronico },
                    { where: { id } }
                );
    
                // Redirige a la lista de direcciones
                res.redirect('/direcciones');
            } catch (error) {
                console.error("Error al actualizar la dirección:", error);
                res.status(500).send("Error al actualizar la dirección");
            }
        }
     
        async create(req, res) {
            if (req.method === 'POST') {
                try {
                  // Extrae los datos de la dirección desde el cuerpo de la solicitud
                  const { Nombre, Apellidos, TelefonoCasa, DireccionCasa, TelefonoTrabajo, DireccionTrabajo, CorreoElectronico } = req.body;
                  
                  // Crea la nueva dirección en la base de datos
                  await Direcciones.create({
                    Nombre,
                    Apellidos,
                    TelefonoCasa,
                    DireccionCasa,
                    TelefonoTrabajo,
                    DireccionTrabajo,
                    CorreoElectronico
                  });
                  
                  // Redirige a la lista de direcciones
                  res.redirect('/direcciones');
                } catch (error) {
                  console.error("Error al crear la dirección:", error);
                  res.status(500).send("Error al crear la dirección");
                }
              } else {
                // Renderiza el formulario de creación
                res.render('direcciones/create', { title: 'Añadir Nueva Dirección' });
              }
          }

}
module.exports = DireccionesController;
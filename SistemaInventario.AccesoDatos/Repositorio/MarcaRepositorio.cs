﻿using SistemaInventario.AccesoDatos.Repositorio.IRepositorio;
using SistemaInventario.Modelos;
using SistemaInventariosV6.AccesoDatos.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaInventario.AccesoDatos.Repositorio
{
    public class BodegaRepisotorio : Repositorio<Bodega>, IBodegaRepositorio
    {
        private readonly ApplicationDbContext _db;
        public BodegaRepisotorio(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Actualizar(Bodega bodega)
        {
            var bodegaBD = _db.Bodegas.FirstOrDefault(b => b.Id == bodega.Id);
            if(bodegaBD !=null)
            {
                bodegaBD.Nombre = bodega.Nombre;
                bodegaBD.Descripcion = bodega.Descripcion;
                bodegaBD.Estado = bodega.Estado;
                _db.SaveChanges();
            }

        }
    }
}

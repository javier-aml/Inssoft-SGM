const guia = {
    "Complemento_Almacenamiento":{
        "TRANSPORTE":{
            "PermisoTransporte":"PL/20200/TRA/OM/2022", 
            /*La presencia de este elemento es opcional */
            "ClaveDeVehiculo":"456TRD", 

            //En caso de que no se haya cobrado la tarifa, deberá manifestarse “0"
            "TarifaDeTransporte":"4.465", 
            //La presencia de este elemento es opcional
            "CargoPorCapacidadTrans":"0.992", 
            //La presencia de este elemento es opcional
            "CargoPorUsoTrans":"0.036",
            "CargoVolumetricoTrans":"3.437"
        }, 
        "DICTAMEN":{
            "RfcDictamen":{}, 
            "LoteDictamen":{}, 
            "NumeroFolioDictamen":{}, 
            "FechaEmisionDictamen":{},
            "ResultadoDictamen":{}
        }, 
        "CERTIFICADO":{
            "RfcCertificado":{}, 
            "NumeroFolioCertificado":{}, 
            "FechaEmisionCertificado":{},
            "ResultadoCertificado":{}
        }, 
        "NACIONAL":{
            "RfcClienteOProveedor":{}, 
            "NombreClienteOProveedor":{},
            "PermisoClienteOProveedor":{},
            "CFDIs":{
                "CFDI":{}, 
                "TipoCFDI":{}, 
                "PrecioCompra":{}, 
                "Contraprestacion":{}, 
                "TarifaDeAlmacenamiento":{}, 
                "CargoPorCapacidadAlmac":{}, 
                "CargoPorUsoAlmac":{}, 
                "CargoVolumetricoAlmac":{}, 
                "Descuento":{}, 
                "FechaYHoraTransaccion":{},
                "VolumenDocumentado":{
                    "ValorNumerico":{},
                    "UM":{}
                }

            }
        }, 
        "EXTRANJERO":{
            "PermisoImportacion":{},
            "PEDIMENTOS":{
                "PuntoDeInternacion":{},
                "PaisOrigen":{}, 
                "MedioDeTransEntraAduana":{}, 
                "PedimentoAduanal":{}, 
                "Incoterms":{}, 
                "PrecioDeImportacion":{},
                "VolumenDocumentado":{
                    "ValorNumerico":{},
                    "UM":{}
                }
            }
        },
        "ACLARACION":{
            "Aclaracion":{}
        }
    }
}
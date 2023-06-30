# APIBue


## Funcionamiento

#### Headers
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. |

*authorization: Token en jwt que devolverá la ruta /api/login.

La API cuenta con dos (2) rutas:
#### login
Devuelve un token jwt que deberá enviar en los headers por cada request que realice al API.

```http
  POST /api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `string` | **Required**. Solicite el usuario al equipo de desarrollo |

```json
{
	"user": "your_app_user"
}
```

`response`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
#### getListInfoBUE
Devuelve la información solicitada segun los datos del body

```http
  POST /api/getListInfoBUE
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `case` | `int` | **Required**. Opcion según tipo de información a soicitar |
| `minDate` | `string` | **Required**. Rango inicial de fecha |
| `maxDate` | `string` | **Required**. Rango final de fecha |
| `pagActual` | `int` | **Required**. Pagina requerida |
| `pagTotal` | `int` | **Required**. Registros por cada pagina |
| `lenght` | `boolean` | **Optional**. Cantidad de registros a consultar |

```json
{
	"case": 6,
	"minDate": "2023-01-01",
	"maxDate": "2023-05-30",
	"pagActual": 1,
	"pagTotal": 200,
	"lenght": false
}
```

`response`

```json
[
  ...data
]
```
## Uso

Haga uso de esta API en la siguiente url

```bash
  https://apibuetest.teleperformance.co/api/ 
```

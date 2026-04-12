# Analytics Data Dictionary

## Objetivo
Este documento define la capa exportable oficial de analítica para consumo en Excel, Power BI, código y futuras integraciones con warehouse.

---

## 1) analytics_export_customer_events_v

**Grano:** 1 fila = 1 evento

**Propósito:** fact principal de eventos de navegación, catálogo, búsqueda, filtros y producto.

| Columna | Significado |
|---|---|
| event_id | Identificador único del evento |
| event_timestamp | Fecha y hora efectiva del evento |
| event_date | Fecha derivada del evento |
| created_at | Fecha de registro en base |
| customer_id | Cliente autenticado, si existe |
| anonymous_id | Identificador anónimo de visitante |
| session_id | Identificador de sesión |
| event_type | Tipo de evento |
| page_path | Ruta donde ocurrió |
| page_title | Título de la página |
| entity_type | Tipo de entidad asociada |
| entity_id | UUID de entidad asociada |
| entity_slug | Slug de entidad asociada |
| search_query | Término buscado |
| event_value | Valor numérico opcional |
| source | Source original |
| medium | Medium original |
| campaign | Campaign original |
| utm_source | UTM source |
| utm_medium | UTM medium |
| utm_campaign | UTM campaign |
| referrer | Referente |
| device_type | Tipo de dispositivo |
| country_code | Código país reportado |
| ip_country_code | Código país inferido por IP |
| event_data | Payload libre del evento |
| filter_payload | Payload libre de filtros |

**Notas:**
- Vista principal para Power BI y análisis detallado.
- `event_data` y `filter_payload` deben tratarse como columnas semiestructuradas.

---

## 2) analytics_export_customer_profiles_v

**Grano:** 1 fila = 1 cliente

**Propósito:** dimensión principal de cliente.

| Columna | Significado |
|---|---|
| customer_id | Identificador del cliente |
| email | Correo |
| full_name | Nombre completo |
| first_name | Nombre |
| last_name | Apellido |
| phone | Teléfono consolidado |
| phone_country_code | Lada |
| phone_national | Número nacional |
| customer_type | Tipo de cliente |
| preferred_contact_channel | Canal preferido |
| accepted_marketing | Aceptación de marketing |
| is_active | Estado activo |
| city | Ciudad |
| state | Estado |
| country | País |
| country_code | Código país |
| postal_code | Código postal |
| address_line_1 | Dirección línea 1 |
| address_line_2 | Dirección línea 2 |
| age_range | Rango de edad |
| acquisition_source | Fuente de adquisición |
| acquisition_source_detail | Detalle de adquisición |
| profile_completion_percent | % de perfil completado |
| email_verified_at | Fecha verificación correo |
| last_login_at | Último acceso |
| password_changed_at | Último cambio de contraseña |
| first_seen_at | Primera vez visto |
| last_seen_at | Última vez visto |
| profile_completed_at | Fecha de perfil completo |
| created_at | Alta |
| updated_at | Última actualización |

**Notas:**
- Dimensión oficial de cliente.
- Base para joins con eventos e intereses.

---

## 3) analytics_export_customer_interests_v

**Grano:** 1 fila = 1 cliente-interés

**Propósito:** relación entre clientes e intereses declarados.

| Columna | Significado |
|---|---|
| customer_id | Identificador del cliente |
| interest_code | Código de interés |
| created_at | Fecha de asociación |

---

## 4) analytics_export_product_interest_v

**Grano:** 1 fila = 1 producto

**Propósito:** agregado de interacción por producto.

| Columna | Significado |
|---|---|
| entity_id | UUID del producto |
| entity_slug | Slug del producto |
| product_views | Total de eventos de producto |
| unique_customers | Clientes únicos |
| unique_sessions | Sesiones únicas |
| first_event_at | Primer evento detectado |
| last_event_at | Último evento detectado |

---

## 5) analytics_export_search_terms_v

**Grano:** 1 fila = 1 término normalizado

**Propósito:** agregado de búsquedas realizadas en catálogo.

| Columna | Significado |
|---|---|
| search_query_normalized | Término normalizado |
| search_query_sample | Ejemplo del término original |
| total_searches | Total de búsquedas |
| unique_sessions | Sesiones únicas |
| unique_customers | Clientes únicos |
| first_event_at | Primera búsqueda |
| last_event_at | Última búsqueda |

---

## 6) analytics_export_catalog_behavior_v

**Grano:** 1 fila = 1 catálogo

**Propósito:** agregado de comportamiento por catálogo.

| Columna | Significado |
|---|---|
| catalog_slug | Catálogo analizado |
| catalog_views | Vistas de catálogo |
| searches | Búsquedas realizadas |
| filter_events | Eventos de filtro |
| product_views | Eventos de producto |
| unique_sessions | Sesiones únicas |
| unique_customers | Clientes únicos |
| first_event_at | Primera actividad detectada |
| last_event_at | Última actividad detectada |

---

## Convención de consumo

### Excel
- Preferir exportación CSV desde endpoints `/api/admin/analytics/export/...?...format=csv`
- Usar una hoja por vista.

### Power BI
- Tratar `analytics_export_customer_events_v` como fact principal.
- Tratar `analytics_export_customer_profiles_v` como dimensión cliente.
- Relacionar por `customer_id`.
- Tratar `event_data` y `filter_payload` como columnas avanzadas opcionales.

### Código
- Consumir endpoints JSON o CSV.
- No depender del dashboard como fuente de datos.

### Futuro warehouse
- Estas vistas representan la primera capa exportable estable.
- Evolución futura sugerida: separar facts y dims en esquema analítico dedicado.

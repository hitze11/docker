# SQL Recap: Relationales Datenmodell und CRUD-Abfragen

## Tabelle: `todos`
| Spaltenname     | Datentyp      | Beschreibung                          |
|------------------|---------------|---------------------------------------|
| `id`            | INTEGER       | Primärschlüssel, eindeutige ID        |
| `title`         | VARCHAR(255)  | Titel des Todos                       |
| `description`   | TEXT          | Beschreibung des Todos                |
| `status`        | BOOLEAN       | Status: erledigt (true) oder offen (false) |
| `created_at`    | TIMESTAMP     | Erstellungsdatum                      |

### SQL-Abfragen (CRUD)

#### CREATE
```sql
INSERT INTO todos (title, description, status, created_at)
VALUES (?, ?, ?, ?);
```

#### READ
- Alle Todos abrufen:
  ```sql
  SELECT * FROM todos;
  ```
- Ein einzelnes Todo anhand der ID abrufen:
  ```sql
  SELECT * FROM todos WHERE id = ?;
  ```
- Todos mit Status "erledigt" abrufen:
  ```sql
  SELECT * FROM todos WHERE status = true;
  ```

#### UPDATE
```sql
UPDATE todos
SET title = ?, description = ?, status = ?
WHERE id = ?;
```

#### DELETE
```sql
DELETE FROM todos WHERE id = ?;
```

---

## Reflexion

### Vorteile einer relationalen Datenbank gegenüber JSON-Dateien
1. **Datenintegrität**: Relationale Datenbanken erzwingen Datentypen und Beziehungen, wodurch Inkonsistenzen vermieden werden.
2. **Abfragen und Filter**: SQL ermöglicht komplexe Abfragen und Filteroperationen, die mit JSON-Dateien schwierig umzusetzen sind.
3. **Skalierbarkeit**: Datenbanken sind für große Datenmengen optimiert und bieten bessere Performance als das Lesen/Schreiben von JSON-Dateien.

### Zweck des Primärschlüssels
Der Primärschlüssel dient dazu, jede Zeile eindeutig zu identifizieren. In meinem Entwurf wird die Spalte `id` als Primärschlüssel verwendet, da sie automatisch inkrementiert und eindeutig ist.

### Abbildung der API-Endpunkte auf SQL-Abfragen
- **GET /todos**: Führt `SELECT * FROM todos;` aus.
- **GET /todos/:id**: Führt `SELECT * FROM todos WHERE id = ?;` aus.
- **POST /todos**: Führt `INSERT INTO todos ...` aus.
- **DELETE /todos/:id**: Führt `DELETE FROM todos WHERE id = ?;` aus.

### Bedeutung von Datenbanken in containerisierten Anwendungen
1. **Datenpersistenz**: Container sind flüchtig, Datenbanken ermöglichen die dauerhafte Speicherung von Daten.
2. **Skalierbarkeit**: Datenbanken können unabhängig von der Anwendung skaliert werden.
3. **Integration**: Datenbanken lassen sich leicht in CI/CD-Pipelines und DevOps-Workflows integrieren.
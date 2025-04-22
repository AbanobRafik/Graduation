# Documentation for API Endpoints

This API serves educational data for various grades, terms, subjects, units, and lessons. The data is stored in a `data.json` file and can be fetched using different query parameters.

## Base URL
```
http://localhost:5000/api/
```

## Query Parameters
- **grades**: The grade (e.g., `Grade4`, `Grade5`) to fetch data for.
- **term**: The term (e.g., `FirstTerm`, `SecondTerm`) to fetch data for.
- **subject**: The subject (e.g., `Math`, `Science`) to fetch data for.
- **unit**: The unit (e.g., `unit1`, `unit2`) within a subject.
- **lessonId**: The lesson ID (e.g., `lesson/1`) to fetch a specific lesson.
- **list**: Fetch lists of available grades, terms, subjects, or units.

## Endpoints

### 1. Fetch All Data
**URL**:  
`GET /api/`

**Description**:  
Fetches all available data for grades, terms, subjects, units, and lessons.

**Response**:  
Returns the entire data structure.

---

### 2. Fetch Data by Grade, Term, Subject, Unit, and Lesson
**URL**:  
`GET /api/?grades={grade}&term={term}&subject={subject}&unit={unit}&lessonId={lessonId}`

**Parameters**:
- **grades**: (e.g., `Grade4`, `Grade5`)
- **term**: (e.g., `FirstTerm`, `SecondTerm`)
- **subject**: (e.g., `Math`, `Science`)
- **unit**: (e.g., `unit1`, `unit2`)
- **lessonId**: (e.g., `lesson/1`)

**Description**:  
Fetches a specific lesson if all query parameters are provided. Otherwise, returns data for the specified unit, subject, term, or grade.

**Response**:  
Returns the requested lesson data or the full data for the specified parameters.

---

### 3. Fetch Lists (Grades, Terms, Subjects, Units)
**URL**:  
`GET /api/?list={listType}`

**Parameters**:
- **list**: The type of list to return. Possible values:
    - `grades`: List of available grades.
    - `terms`: List of available terms for the specified grade.
    - `subjects`: List of available subjects for the specified grade and term.
    - `units`: List of available units for the specified grade, term, and subject.

**Description**:  
Fetches a list of available data for grades, terms, subjects, or units.

**Response**:  
Returns a JSON object with the requested list.

#### Examples:
- **Grades**:
    ```json
    {
        "grades": ["Grade4", "Grade5"]
    }
    ```
- **Terms (for Grade4)**:
    ```json
    {
        "terms": ["FirstTerm", "SecondTerm"]
    }
    ```
- **Subjects (for Grade4, FirstTerm)**:
    ```json
    {
        "subjects": ["Science", "Math"]
    }
    ```
- **Units (for Grade4, FirstTerm, Science)**:
    ```json
    {
        "units": ["unit1", "unit2"]
    }
    ```

---

## Examples

### 1. Get All Data
**Request**:  
`GET http://localhost:5000/api/`

**Response**:  
Returns all available data.

---

### 2. Get Data for a Specific Grade
**Request**:  
`GET http://localhost:5000/api/?grades=Grade4`

**Response**:  
Returns data for `Grade4`.

---

### 3. Get Data for a Specific Term
**Request**:  
`GET http://localhost:5000/api/?grades=Grade4&term=FirstTerm`

**Response**:  
Returns data for `FirstTerm` in `Grade4`.

---

### 4. Get Data for a Specific Subject
**Request**:  
`GET http://localhost:5000/api/?grades=Grade4&term=FirstTerm&subject=Science`

**Response**:  
Returns data for `Science` in `Grade4`, `FirstTerm`.

---

### 5. Get Data for a Specific Unit
**Request**:  
`GET http://localhost:5000/api/?grades=Grade4&term=FirstTerm&subject=Science&unit=unit1`

**Response**:  
Returns data for `unit1` in `Science`, `Grade4`, `FirstTerm`.

---

### 6. Get Data for a Specific Lesson
**Request**:  
`GET http://localhost:5000/api/?grades=Grade4&term=FirstTerm&subject=Science&unit=unit1&lessonId=1`

**Response**:  
Returns data for `lesson 1` in `unit1`, `Science`, `Grade4`, `FirstTerm`.

---

### 7. Get List of All Grades
**Request**:  
`GET http://localhost:5000/api/?list=grades`

**Response**:  
```json
{
    "grades": ["Grade4", "Grade5"]
}
```

---

### 8. Get List of Terms for a Specific Grade
**Request**:  
`GET http://localhost:5000/api/?list=terms&grades=Grade4`

**Response**:  
```json
{
    "terms": ["FirstTerm", "SecondTerm"]
}
```

---

### 9. Get List of Subjects for a Specific Grade and Term
**Request**:  
`GET http://localhost:5000/api/?list=subjects&grades=Grade4&term=FirstTerm`

**Response**:  
```json
{
    "subjects": ["Science", "Math"]
}
```

---

### 10. Get List of Units for a Specific Grade, Term, and Subject
**Request**:  
`GET http://localhost:5000/api/?list=units&grades=Grade4&term=FirstTerm&subject=Science`

**Response**:  
```json
{
    "units": ["unit1", "unit2"]
}
```

---

## Error Responses

- **404 Not Found**: If the requested data does not exist.  
    Example:  
    ```json
    {
        "message": "الصف غير موجود"
    }
    ```

- **400 Bad Request**: If the `list` query parameter is invalid.  
    Example:  
    ```json
    {
        "message": "Invalid list query parameter"
    }
    ```

- **500 Internal Server Error**: If there is an error loading the data.  
    Example:  
    ```json
    {
        "message": "خطأ في تحميل البيانات"
    }
    ```

---

## Conclusion
This API allows fetching educational data by specifying query parameters such as `grades`, `term`, `subject`, `unit`, and `lessonId`. It also supports fetching lists of available data like grades, terms, subjects, and units.
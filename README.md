# API Documentation

## Base URL

`/api`

---

## 1. List the Grades

- **Endpoint**: `/api/grades`
- **Method**: `GET`
- **Response**:
    ```json
    ["fourthGrade", "fifthGrade", "sixthGrade"]
    ```
    **Description**: This endpoint returns all available grades in camelCase (e.g., fourthGrade, fifthGrade, sixthGrade).

---

## 2. List Terms for a Specific Grade

- **Endpoint**: `/api/:grade/terms`
- **Method**: `GET`
- **Parameters**:
    - `:grade` (e.g., fourthGrade, fifthGrade)
- **Response**:
    ```json
    ["firstTerm", "secondTerm"]
    ```
    **Description**: This endpoint returns all available terms (e.g., firstTerm, secondTerm) for the specified grade.

---

## 3. List Subjects for a Specific Grade and Term

- **Endpoint**: `/api/:grade/:term/subjects`
- **Method**: `GET`
- **Parameters**:
    - `:grade` (e.g., fourthGrade, fifthGrade)
    - `:term` (e.g., firstTerm, secondTerm)
- **Response**:
    ```json
    ["math", "science"]
    ```
    **Description**: This endpoint returns all subjects for the specified grade and term.

---

## 4. List Units for a Specific Grade, Term, and Subject

- **Endpoint**: `/api/:grade/:term/:subject/units`
- **Method**: `GET`
- **Parameters**:
    - `:grade` (e.g., fourthGrade, fifthGrade)
    - `:term` (e.g., firstTerm, secondTerm)
    - `:subject` (e.g., math, science)
- **Response**:
    ```json
    ["unit1", "unit2", "unit3"]
    ```
    **Description**: This endpoint returns all units for the specified grade, term, and subject.

---

## 5. List Lesson Titles for a Specific Unit, Subject, Term, and Grade

- **Endpoint**: `/api/:grade/:term/:subject/:unit/titles`
- **Method**: `GET`
- **Parameters**:
    - `:grade` (e.g., fourthGrade, fifthGrade)
    - `:term` (e.g., firstTerm, secondTerm)
    - `:subject` (e.g., math, science)
    - `:unit` (e.g., unit1, unit2)
- **Response**:
    ```json
    [
        { "id": 1, "title": "Lesson 1" },
        { "id": 2, "title": "Lesson 2" }
    ]
    ```
    **Description**: This endpoint returns the lesson titles for the specified unit, subject, term, and grade.

---

## 6. Get a Specific Lesson by ID

- **Endpoint**: `/api/:grade/:term/:subject/:unit/lesson/:id`
- **Method**: `GET`
- **Parameters**:
    - `:grade` (e.g., fourthGrade, fifthGrade)
    - `:term` (e.g., firstTerm, secondTerm)
    - `:subject` (e.g., math, science)
    - `:unit` (e.g., unit1, unit2)
    - `:id` (lesson ID, e.g., 1, 2)
- **Response**:
    ```json
    {
        "id": 1,
        "title": "Lesson 1",
        "content": "Lesson content here",
        "model": "model_file_path_here"
    }
    ```
    **Description**: This endpoint returns the details of a specific lesson by ID for the specified grade, term, subject, and unit.

---

## 7. Get Model of a Specific Lesson by ID

- **Endpoint**: `/api/:grade/:term/:subject/:unit/lesson/:id/model`
- **Method**: `GET`
- **Parameters**:
    - `:grade` (e.g., fourthGrade, fifthGrade)
    - `:term` (e.g., firstTerm, secondTerm)
    - `:subject` (e.g., math, science)
    - `:unit` (e.g., unit1, unit2)
    - `:id` (lesson ID, e.g., 1, 2)
- **Response**:
    ```json
    {
        "model": "model_file_path_here"
    }
    ```
    **Description**: This endpoint returns the model (e.g., .glb file) associated with the specific lesson.

---

## Example Requests

### 1. List Grades

- **Request**:
    ```bash
    GET /api/grades
    ```
- **Response**:
    ```json
    ["fourthGrade", "fifthGrade", "sixthGrade"]
    ```

### 2. List Terms for a Grade

- **Request**:
    ```bash
    GET /api/fourthGrade/terms
    ```
- **Response**:
    ```json
    ["firstTerm", "secondTerm"]
    ```

### 3. List Subjects for a Grade and Term

- **Request**:
    ```bash
    GET /api/fourthGrade/firstTerm/subjects
    ```
- **Response**:
    ```json
    ["math", "science"]
    ```

### 4. List Units for a Subject, Term, and Grade

- **Request**:
    ```bash
    GET /api/fourthGrade/firstTerm/math/units
    ```
- **Response**:
    ```json
    ["unit1", "unit2", "unit3"]
    ```

### 5. Get Lesson Titles for a Unit, Subject, Term, and Grade

- **Request**:

    ```bash
    GET /api/fourthGrade/firstTerm/science/unit1/titles
    ```
    - **Response**:
            ```json
            [
                    {"id": 1, "title": "Lesson 1"},
                    {"id": 2, "title": "Lesson 2"}
            ]
            ```

### 6. Get a Specific Lesson by ID

- **Request**:
    ```bash
    GET /api/fourthGrade/firstTerm/science/unit1/lesson/1
    ```
- **Response**:
    ```json
    {
        "id": 1,
        "title": "Lesson 1",
        "content": "Lesson content here",
        "model": "model_file_path_here"
    }
    ```

### 7. Get the Model of a Specific Lesson by ID

- **Request**:
    ```bash
    GET /api/fourthGrade/firstTerm/science/unit1/lesson/1/model
    ```
- **Response**:
    ```json
    {
        "model": "model_file_path_here"
    }
    ```
---

This now aligns all examples in a consistent format!

# Simple Recommender System

## Installation

First, you need to clone this repository:

```bash
git clone https://github.com/abuuwais21/simple-recommender-system.git
```

Then change into the `simple-recommender-system` folder:

```bash
cd simple-recommender-system
```

# BACKEND

Now, we will need to create a virtual environment and install all the dependencies:

```bash
python3 -m venv venv  # on Windows, use "python -m venv venv" instead
. venv/bin/activate   # on Windows, use "venv\Scripts\activate" instead
```

```bash
pip install -r requirements.txt
```

OR

```bash
./install_libs.sh
```

## How to Run the Application?

**Before run the application, make sure you have activated the virtual enviroment.**

If you want to run the backend application, just execute these commands:

```bash
cd backend
flask run
```

The applications will always running on http://localhost:5000.

=================================================================

# FRONTEND

## How to Run the Application?

**Before run the application, make sure you have these prequisites (Node, NPM, also NVM (If you prefer have multiple version of NODE in one system)**

If you want to run the frontend application, just execute these commands:

```bash
cd frontend
```

## Packages Installation

```bash
npm i
```

## Running the development

```bash
npm run start
```

OR

```bash
yarn start
```

The applications will always running on http://localhost:3000.

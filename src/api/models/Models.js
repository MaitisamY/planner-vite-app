import { Sequelize, DataTypes } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config();

// Sequelize setup
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
        }
    }
});

// Defining User model
const User = sequelize.define('User', { 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false
});

// Defining Note model
const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    update_date: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'notes',
    timestamps: false
});

// Defining Checklist model
const Checklist = sequelize.define('Checklist', {
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    }
}, {
    tableName: 'checklist',
    timestamps: false
});

// Defining Task model
const Task = sequelize.define('Task', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    updated_date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    due_date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    }
}, {
    tableName: 'tasks',
    timestamps: false
});

Task.hasMany(Checklist, { foreignKey: 'task_id' });
Checklist.belongsTo(Task, { foreignKey: 'task_id' });

(async () => {
    try {
        // Sync all defined models to the DB
        await sequelize.sync({ alter: false });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
})();

export { sequelize, User, Note, Checklist, Task };

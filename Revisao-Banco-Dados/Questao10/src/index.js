const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');

const backupPath = path.join(__dirname, 'backups', `telemetria_backup_${Date.now()}`);
const dbName = 'revisaobd3'; 

const backupCommand = `mkdir -p "${backupPath}" && mongodump --db ${dbName} --out "${backupPath}"`;


cron.schedule('00 22 * * *', () => {
    console.log(`Iniciando backup diário da telemetria (${dbName}) às 22:00...`);
    
    exec(backupCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro no backup: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erro (stderr) no backup: ${stderr}`);
            return;
        }
        console.log(`Backup concluído com sucesso em: ${backupPath}`);
        console.log(stdout);
    });
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo" 
});

console.log('Agendador de backup iniciado. Próximo backup: 22:00.');
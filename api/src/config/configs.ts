type IAppConfig = {
 REDIS_HOST: string;
 MYSQL_HOST: string;
 UNIPOT_HOST : string;
  };
  
  const AppConfig: IAppConfig = {
    REDIS_HOST:  process.env.redis_host ||  '',
    MYSQL_HOST: process.env.mysql_host || '', 
    UNIPOT_HOST:  process.env.unipot_host || '', 
  };
  
  export default AppConfig;
  
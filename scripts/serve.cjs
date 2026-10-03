const http=require('node:http'), fs=require('node:fs'), path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
function serve(req,res){
  let name; try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  if(name==='/') name='/implementacao/index.html';
  const file=path.resolve(root,'.'+name);
  if(!file.startsWith(root+path.sep) || !file.startsWith(path.join(root,'implementacao')+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end('Página não encontrada');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
}
module.exports=serve;
if(require.main===module) http.createServer(serve).listen(4173,'127.0.0.1',()=>console.log('IA para Aprender: http://127.0.0.1:4173/implementacao/index.html'));

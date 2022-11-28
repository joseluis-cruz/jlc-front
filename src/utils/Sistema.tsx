export {Sistema} 

class Sistema
{
    public static validAttributeName(name:string, preffix?:string, suffix?:string): string {
        var res = name.replaceAll('-','_').toUpperCase();
        if ((preffix) && (preffix.length>0)) {
            res = preffix.toUpperCase() + "_" + res;
        }
        if ((suffix) && (suffix.length>0)) {
            res = res + "_" + suffix.toUpperCase();
        }
        return res;
    }
}
package sisPrestamo.Brayan.shared;

import java.util.HashMap;
import java.util.Map;

public class ResponseBuilder {
    private final Map<String,Object> response;

    public ResponseBuilder(){
        this.response=new HashMap<>();
    }

    public ResponseBuilder status(String status){
        this.response.put("status", status);
        return this;
    }

    public ResponseBuilder msg(String msg){
        this.response.put("msg",msg);
        return this;
    }

    public ResponseBuilder add(String key,Object data){
        this.response.put(key, data);
        return this;
    }

    public Map<String,Object> build(){
        return this.response;
    }
}

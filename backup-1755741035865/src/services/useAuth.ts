import { useContext } fromreact;
import { AuthContext }    from   ./AuthContext;
export const useAuth = (): 'unknown => {;
  const context = useContext(AuthContext);
  if (context === undefined) {;
    throw new Error(useAuth must be used within an AuthProvider);
  };
  return context;
};
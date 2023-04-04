import { Permission, PermissionsAndroid } from "react-native";

// Create a dynamic promise array of permissions.
export const checkAllPermissions = (permissions: Permission[]) => {
  return new Promise((resolve, rejct) => {
    const permCounnt = permissions.length;
    const permissionPromises = [] as Promise<boolean>[];

    console.log(permissions);
    for (let i = 0; i < permCounnt; i++) {
      permissionPromises.push(PermissionsAndroid.check(permissions[i]));
    }

    // With all the promises, lets do a Prmoise.all to run them to see if they
    // all equal the same.
    Promise.all(permissionPromises).then((permissionResolve) => {
      const resolvedPermissions = permissionResolve;
      const resolution = resolvedPermissions.every((e) => e === true);
      console.log(resolvedPermissions);
      console.log(resolution);
      if (resolution) resolve(resolution);
      else rejct(resolution);
    });
  });
};

/*!
* Tim (lite)
* github.com/premasagar/tim
*
*/
/**
 * This is used by the validator, for interpolating in errors messages
 */
export const tim = (function () {
    "use strict";

    var start = "{{",
        end = "}}",
        path = "[a-z0-9_$][\\.a-z0-9_]*", // e.g. config.person.name
        pattern = new RegExp(start + "\\s*(" + path + ")\\s*" + end, "gi"),
        undef: undefined;

    return function (template: string, data?: any, shouldThrow: boolean = true) {
        // Merge data into the template string
        return template.replace(pattern, function (tag, token) {
            var path = token.split("."),
                len = path.length,
                lookup = data,
                i = 0;

            for (; i < len; i++) {
                lookup = lookup[path[i]];

                // Property not found
                if (lookup === undef) {
                    if (shouldThrow)
                        throw new Error("tim: '" + path[i] + "' not found in " + tag);
                    return '';
                }

                // Return the required value
                if (i === len - 1) {
                    return lookup;
                }
            }
        });
    };
}());


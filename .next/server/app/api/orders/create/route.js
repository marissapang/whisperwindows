/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/orders/create/route";
exports.ids = ["app/api/orders/create/route"];
exports.modules = {

/***/ "(rsc)/./app/api/orders/create/route.ts":
/*!****************************************!*\
  !*** ./app/api/orders/create/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _aws_sdk_lib_dynamodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/lib-dynamodb */ \"(rsc)/./node_modules/@aws-sdk/lib-dynamodb/dist-es/index.js\");\n/* harmony import */ var _app_libs_dynamodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/libs/dynamodb */ \"(rsc)/./app/libs/dynamodb.ts\");\n// app/api/orders/create/route.ts\n\n\n\nconst docClient = _aws_sdk_lib_dynamodb__WEBPACK_IMPORTED_MODULE_1__.DynamoDBDocumentClient.from(_app_libs_dynamodb__WEBPACK_IMPORTED_MODULE_2__.ddb);\nasync function POST(request) {\n    const body = await request.json();\n    const command = new _aws_sdk_lib_dynamodb__WEBPACK_IMPORTED_MODULE_1__.PutCommand({\n        TableName: 'Orders',\n        Item: body\n    });\n    try {\n        await docClient.send(command);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (err) {\n        console.error('DynamoDB insert error:', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: 'Insert failed'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL29yZGVycy9jcmVhdGUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLGlDQUFpQztBQUN1QjtBQUNtQjtBQUNqQztBQUUxQyxNQUFNSSxZQUFZSCx5RUFBc0JBLENBQUNJLElBQUksQ0FBQ0YsbURBQUdBO0FBRTFDLGVBQWVHLEtBQUtDLE9BQW9CO0lBQzdDLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUUsSUFBSTtJQUUvQixNQUFNQyxVQUFVLElBQUlSLDZEQUFVQSxDQUFDO1FBQzdCUyxXQUFXO1FBQ1hDLE1BQU1KO0lBQ1I7SUFFQSxJQUFJO1FBQ0YsTUFBTUosVUFBVVMsSUFBSSxDQUFDSDtRQUNyQixPQUFPVixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVLLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUUMsS0FBSyxDQUFDLDBCQUEwQkY7UUFDeEMsT0FBT2YscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFSyxTQUFTO1lBQU9HLE9BQU87UUFBZ0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDckY7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2FwcGxlL0RvY3VtZW50cy9HaXRIdWIvd2hpc3BlcndpbmRvd3MvYXBwL2FwaS9vcmRlcnMvY3JlYXRlL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvb3JkZXJzL2NyZWF0ZS9yb3V0ZS50c1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IER5bmFtb0RCRG9jdW1lbnRDbGllbnQsIFB1dENvbW1hbmQgfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuaW1wb3J0IHsgZGRiIH0gZnJvbSAnQC9hcHAvbGlicy9keW5hbW9kYic7XG5cbmNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShkZGIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG5cbiAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRDb21tYW5kKHtcbiAgICBUYWJsZU5hbWU6ICdPcmRlcnMnLFxuICAgIEl0ZW06IGJvZHksXG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgZG9jQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignRHluYW1vREIgaW5zZXJ0IGVycm9yOicsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnSW5zZXJ0IGZhaWxlZCcgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIkR5bmFtb0RCRG9jdW1lbnRDbGllbnQiLCJQdXRDb21tYW5kIiwiZGRiIiwiZG9jQ2xpZW50IiwiZnJvbSIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImpzb24iLCJjb21tYW5kIiwiVGFibGVOYW1lIiwiSXRlbSIsInNlbmQiLCJzdWNjZXNzIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/orders/create/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/libs/dynamodb.ts":
/*!******************************!*\
  !*** ./app/libs/dynamodb.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ddb: () => (/* binding */ ddb)\n/* harmony export */ });\n/* harmony import */ var _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/client-dynamodb */ \"(rsc)/./node_modules/@aws-sdk/client-dynamodb/dist-es/DynamoDBClient.js\");\n// lib/dynamodb.ts\n\nconst ddb = new _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__.DynamoDBClient({\n    region: process.env.AWS_REGION,\n    credentials: {\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGlicy9keW5hbW9kYi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtCQUFrQjtBQUV3QztBQUVuRCxNQUFNQyxNQUFNLElBQUlELG9FQUFjQSxDQUFDO0lBQ3BDRSxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7SUFDOUJDLGFBQWE7UUFDWEMsYUFBYUosUUFBUUMsR0FBRyxDQUFDSSxpQkFBaUI7UUFDMUNDLGlCQUFpQk4sUUFBUUMsR0FBRyxDQUFDTSxxQkFBcUI7SUFDcEQ7QUFDRixHQUFHIiwic291cmNlcyI6WyIvVXNlcnMvYXBwbGUvRG9jdW1lbnRzL0dpdEh1Yi93aGlzcGVyd2luZG93cy9hcHAvbGlicy9keW5hbW9kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaWIvZHluYW1vZGIudHNcblxuaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuXG5leHBvcnQgY29uc3QgZGRiID0gbmV3IER5bmFtb0RCQ2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICBjcmVkZW50aWFsczoge1xuICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCEsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiBwcm9jZXNzLmVudi5BV1NfU0VDUkVUX0FDQ0VTU19LRVkhLFxuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiRHluYW1vREJDbGllbnQiLCJkZGIiLCJyZWdpb24iLCJwcm9jZXNzIiwiZW52IiwiQVdTX1JFR0lPTiIsImNyZWRlbnRpYWxzIiwiYWNjZXNzS2V5SWQiLCJBV1NfQUNDRVNTX0tFWV9JRCIsInNlY3JldEFjY2Vzc0tleSIsIkFXU19TRUNSRVRfQUNDRVNTX0tFWSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/libs/dynamodb.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Fcreate%2Froute&page=%2Fapi%2Forders%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Fcreate%2Froute.ts&appDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Fcreate%2Froute&page=%2Fapi%2Forders%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Fcreate%2Froute.ts&appDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_apple_Documents_GitHub_whisperwindows_app_api_orders_create_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/orders/create/route.ts */ \"(rsc)/./app/api/orders/create/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/orders/create/route\",\n        pathname: \"/api/orders/create\",\n        filename: \"route\",\n        bundlePath: \"app/api/orders/create/route\"\n    },\n    resolvedPagePath: \"/Users/apple/Documents/GitHub/whisperwindows/app/api/orders/create/route.ts\",\n    nextConfigOutput,\n    userland: _Users_apple_Documents_GitHub_whisperwindows_app_api_orders_create_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZvcmRlcnMlMkZjcmVhdGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRm9yZGVycyUyRmNyZWF0ZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRm9yZGVycyUyRmNyZWF0ZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFwcGxlJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGd2hpc3BlcndpbmRvd3MlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYXBwbGUlMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZ3aGlzcGVyd2luZG93cyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMkI7QUFDeEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9hcHBsZS9Eb2N1bWVudHMvR2l0SHViL3doaXNwZXJ3aW5kb3dzL2FwcC9hcGkvb3JkZXJzL2NyZWF0ZS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvb3JkZXJzL2NyZWF0ZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL29yZGVycy9jcmVhdGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL29yZGVycy9jcmVhdGUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvYXBwbGUvRG9jdW1lbnRzL0dpdEh1Yi93aGlzcGVyd2luZG93cy9hcHAvYXBpL29yZGVycy9jcmVhdGUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Fcreate%2Froute&page=%2Fapi%2Forders%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Fcreate%2Froute.ts&appDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@aws-sdk","vendor-chunks/next","vendor-chunks/@smithy","vendor-chunks/uuid","vendor-chunks/mnemonist","vendor-chunks/obliterator"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Fcreate%2Froute&page=%2Fapi%2Forders%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Fcreate%2Froute.ts&appDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fapple%2FDocuments%2FGitHub%2Fwhisperwindows&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
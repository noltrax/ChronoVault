<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $origin = $request->headers->get('Origin');

        // Allowed origins
        $allowedOrigins = [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            config('app.frontend_url'),
        ];

        if ($origin && preg_match('/^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/', $origin)) {
            $allowedOrigins[] = $origin;
        }

        // Preflight OPTIONS: return immediately
        if ($request->isMethod('OPTIONS')) {
            Log::info('CORS OPTIONS request from: ' . ($origin ?? 'none'));
            return response()->json('OK', 204, [
                'Access-Control-Allow-Origin'      => in_array($origin, $allowedOrigins) ? $origin : '*',
                'Access-Control-Allow-Methods'     => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers'     => 'Origin, Content-Type, Authorization, X-Requested-With',
                'Access-Control-Allow-Credentials' => 'true',
                'Access-Control-Max-Age'           => '86400',
            ]);
        }

        // Call next middleware / controller
        $response = $next($request);

        // Add CORS headers to actual response
        if ($origin && in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Requested-With');
            $response->headers->set('Access-Control-Allow-Credentials', 'false');
            $response->headers->set('Access-Control-Max-Age', '86400');
        }

        Log::info('CORS checked for origin: ' . ($origin ?? 'none') . ', status: ' . $response->getStatusCode());

        return $response;
    }
}

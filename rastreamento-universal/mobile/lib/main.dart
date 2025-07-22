
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(MyApp());

const apiUrl = 'https://SEU_BACKEND_ON_RENDER.onrender.com/localizacao';

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String status = "Iniciando...";

  @override
  void initState() {
    super.initState();
    iniciarRastreamento();
  }

  Future<void> enviarLocalizacao(Position pos) async {
    await http.post(
      Uri.parse(apiUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "user_id": "user123",
        "lat": pos.latitude,
        "lng": pos.longitude,
        "timestamp": DateTime.now().toUtc().toIso8601String(),
      }),
    );
  }

  void iniciarRastreamento() async {
    await Geolocator.requestPermission();
    Geolocator.getPositionStream(
      locationSettings: LocationSettings(accuracy: LocationAccuracy.high, distanceFilter: 10),
    ).listen((Position pos) {
      enviarLocalizacao(pos);
      setState(() {
        status = "Lat: ${pos.latitude}, Lng: ${pos.longitude}";
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(appBar: AppBar(title: Text("Rastreamento")), body: Center(child: Text(status))),
    );
  }
}

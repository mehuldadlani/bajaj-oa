import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_animate/flutter_animate.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bajaj Finserv Challenge',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _controller = TextEditingController();
  Map<String, dynamic>? _response;
  List<String> _selectedOptions = [];
  String? _error;

  void _submitData() async {
    setState(() {
      _error = null;
      _response = null;
    });

    try {
      final jsonData = json.decode(_controller.text);
      final response = await http.post(
        Uri.parse('YOUR_BACKEND_URL/bfhl'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(jsonData),
      );

      if (response.statusCode == 200) {
        setState(() {
          _response = json.decode(response.body);
        });
      } else {
        throw Exception('Failed to load data');
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bajaj Finserv Challenge'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _controller,
              maxLines: 5,
              decoration: InputDecoration(
                hintText: 'Enter JSON here...',
                border: OutlineInputBorder(),
              ),
            ).animate().fadeIn().slideY(begin: 0.5, end: 0),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _submitData,
              child: Text('Submit'),
            ).animate().fadeIn().slideY(begin: 0.5, end: 0),
            if (_error != null)
              Padding(
                padding: EdgeInsets.only(top: 16),
                child: Text(
                  _error!,
                  style: TextStyle(color: Colors.red),
                ),
              ).animate().shakeX(),
            if (_response != null) ...[
              SizedBox(height: 16),
              Wrap(
                spacing: 8,
                children: [
                  'Alphabets',
                  'Numbers',
                  'Highest lowercase alphabet'
                ].map((option) => FilterChip(
                  label: Text(option),
                  selected: _selectedOptions.contains(option),
                  onSelected: (selected) {
                    setState(() {
                      if (selected) {
                        _selectedOptions.add(option);
                      } else {
                        _selectedOptions.remove(option);
                      }
                    });
                  },
                )).toList(),
              ).animate().fadeIn(),
              SizedBox(height: 16),
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text(
                    _getFilteredResponse(),
                    style: TextStyle(fontFamily: 'Courier'),
                  ),
                ),
              ).animate().fadeIn().slideY(begin: 0.5, end: 0),
            ],
          ],
        ),
      ),
    );
  }

  String _getFilteredResponse() {
    final filteredResponse = Map<String, dynamic>.from(_response!);
    if (!_selectedOptions.contains('Alphabets')) {
      filteredResponse.remove('alphabets');
    }
    if (!_selectedOptions.contains('Numbers')) {
      filteredResponse.remove('numbers');
    }
    if (!_selectedOptions.contains('Highest lowercase alphabet')) {
      filteredResponse.remove('highest_lowercase_alphabet');
    }
    return JsonEncoder.withIndent('  ').convert(filteredResponse);
  }
}
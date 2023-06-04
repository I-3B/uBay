import 'package:flutter/material.dart';
import 'package:warehouse/features/auth/presentation/widget/forgot_password_page_widget.dart';

class ForgotPasswordPage extends StatelessWidget {
  ForgotPasswordPage({Key? key}) : super(key: key);
  final emailController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: _buildBody(context),
    );
  }

  AppBar _buildAppBar(BuildContext context) => AppBar(
        title: const Text(
          'نظيف',
          style: TextStyle(fontFamily: 'Mont', color: Colors.white),
        ),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.white,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      );

  Widget _buildBody(BuildContext context) => ForgotPasswordPageWidget();
}